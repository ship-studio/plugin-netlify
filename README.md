# Netlify Plugin for Ship Studio

One-click deploy to Netlify from the Ship Studio toolbar.

## What it does

This plugin adds a Netlify button to the Ship Studio toolbar that guides users through the full deploy flow:

1. **Install CLI** — auto-installs `netlify-cli` via npx on first use
2. **Authenticate** — opens the Netlify OAuth flow
3. **Link site** — create a new Netlify site or link an existing one
4. **Deploy** — builds the project and deploys to production

Once connected, the toolbar dropdown provides quick access to:
- Production URL
- Branch preview URLs
- Netlify dashboard
- One-click redeploy

## Development

```bash
npm install
npm run dev    # watch mode
npm run build  # production build
```

The plugin compiles to a single `dist/index.js` ES module that Ship Studio loads at runtime.

### Project structure

```
src/index.tsx   — entire plugin (styles, components, API helpers)
plugin.json     — Ship Studio plugin manifest
vite.config.ts  — build config with Ship Studio React bridge
```

### How the build works

Ship Studio provides React via `window.__SHIPSTUDIO_REACT__`. The vite config maps `react` and `react/jsx-runtime` imports to these globals using `data:` URL shims. The `jsxs` → `createElement` bridge in `vite.config.ts` properly spreads children arrays to avoid React key warnings.

## Architecture

The plugin is a single `index.tsx` file with no external runtime dependencies. It uses:

- **Netlify CLI** (`npx netlify-cli`) for authentication, status checks, and deploys
- **Netlify REST API** (via `curl`) for site creation and listing — more reliable than CLI for these operations
- **Ship Studio plugin context** for shell access, storage, theming, and toast notifications

### State machine

The toolbar component progresses through these states:

```
CHECKING → NOT_INSTALLED → NOT_AUTHENTICATED → NOT_LINKED → CONNECTED
                                                    ↕
                                              WRONG_ACCOUNT
```

The `CONNECTED` state shows a hover dropdown with site URLs and actions. The `DEPLOYING` state is transient during builds.

### Token resolution

The plugin reads the Netlify auth token directly from `~/Library/Preferences/netlify/config.json` (written by `netlify login`). This avoids spawning a CLI process for every API call.

### Output directory detection

When creating or linking a site, the plugin auto-detects the build output directory by:

1. Reading `package.json` for framework dependencies (Next.js, Vite, Astro, CRA, etc.)
2. For Next.js, inspecting `next.config.*` for `output: 'export'` or custom `distDir`
3. Falling back to checking which common output directories exist on disk
