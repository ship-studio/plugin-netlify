import { defineConfig, Plugin } from 'vite';

/**
 * Replaces React/JSX external imports with inline references to
 * window.__SHIPSTUDIO_REACT__. This avoids data: URL imports which
 * fail when Ship Studio loads plugins via Blob URLs (CSP restriction).
 */
function shipStudioReactPlugin(): Plugin {
  return {
    name: 'ship-studio-react',
    generateBundle(_opts, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== 'chunk') continue;

        // Strip all data: URL import lines (handles both quote styles)
        let code = file.code.replace(
          /import\s*\{[^}]*\}\s*from\s*['"]data:text\/javascript[^'"]*['"];\n?/g,
          '',
        );

        // Prepend inline React bindings with the same names the compiled code uses
        const header = [
          'const __R = window.__SHIPSTUDIO_REACT__;',
          'const { useState, useEffect, useRef, useCallback, useMemo } = __R;',
          'const Fragment = __R.Fragment;',
          'function jsx(t, p) { const { children: c, ...r } = p; return c !== undefined ? __R.createElement(t, r, c) : __R.createElement(t, r); }',
          'function jsxs(t, p) { const { children: c, ...r } = p; return __R.createElement(t, r, ...c); }',
          '',
        ].join('\n');

        file.code = header + code;
      }
    },
  };
}

export default defineConfig({
  plugins: [shipStudioReactPlugin()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Placeholder paths so Rollup treats these as external — the plugin
        // strips the resulting import lines and inlines window globals instead.
        paths: {
          react: 'data:text/javascript,',
          'react/jsx-runtime': 'data:text/javascript,',
          'react-dom': 'data:text/javascript,',
        },
      },
    },
    minify: false,
  },
});
