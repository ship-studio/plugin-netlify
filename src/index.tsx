/**
 * Ship Studio — Netlify Plugin
 *
 * One-click deploy to Netlify via the Netlify CLI.
 * Lives in the toolbar slot and guides users through:
 *   install CLI → authenticate → link site → deploy
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------

const NF_STYLE_ID = 'nf-plugin-styles';

const NETLIFY_CSS = `
@keyframes nfPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.nf-checking {
  cursor: wait;
}

.nf-checking .nf-checking-text {
  animation: nfPulse 1.5s ease-in-out infinite;
}

.nf-deploying {
  color: #00AD9F !important;
  cursor: wait;
}

.nf-deploying .nf-deploying-text {
  animation: nfPulse 1.5s ease-in-out infinite;
}

/* Dropdown */
.nf-dropdown-wrapper {
  position: relative;
}

.nf-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  padding-top: 4px;
  z-index: 100;
}

.nf-dropdown-inner {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px;
  min-width: 200px;
  max-width: 320px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.nf-dropdown-inner button {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  border-radius: 6px;
  text-align: left;
}

.nf-dropdown-inner button:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.nf-dropdown-inner button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nf-dropdown-inner button svg {
  flex-shrink: 0;
  opacity: 0.5;
}

.nf-dropdown-inner button:hover svg {
  opacity: 1;
}

.nf-site-url {
  flex: 1;
  min-width: 0;
  font-family: monospace;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nf-dropdown-divider {
  height: 1px;
  background: var(--border);
  margin: 4px 0;
}

.nf-badge {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 3px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.nf-badge-prod {
  color: rgba(74, 222, 128, 0.9);
  background: rgba(74, 222, 128, 0.12);
}

.nf-badge-preview {
  color: rgba(96, 165, 250, 0.9);
  background: rgba(96, 165, 250, 0.12);
}

.nf-badge-dashboard {
  color: rgba(251, 191, 36, 0.9);
  background: rgba(251, 191, 36, 0.12);
}

.nf-badge-ci {
  color: rgba(74, 222, 128, 0.9);
  background: rgba(74, 222, 128, 0.12);
}

/* Dropdown action items (smaller, muted) */
.nf-dropdown-action {
  color: var(--text-muted) !important;
  font-size: 12px !important;
  padding: 8px 12px !important;
  gap: 6px !important;
}

.nf-dropdown-action:hover {
  color: var(--text-secondary) !important;
}

.nf-dropdown-action svg {
  opacity: 0.6;
}

.nf-dropdown-action:hover svg {
  opacity: 1;
}

.nf-dropdown-action.nf-action-danger:hover {
  color: var(--error, #ef4444) !important;
}

.nf-dropdown-action.nf-action-danger:hover svg {
  color: var(--error, #ef4444);
}

/* Account mismatch */
.nf-mismatch-text {
  padding: 10px 12px;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
}

.nf-mismatch-text strong {
  color: var(--text-primary);
  font-weight: 600;
}

/* Modal — fully self-contained, no host class dependencies */
.nf-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.nf-modal {
  width: 400px;
  max-height: 80vh;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.nf-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
}

.nf-close-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 4px;
  opacity: 0.4;
  line-height: 1;
}

.nf-close-btn:hover {
  opacity: 0.8;
}

.nf-modal-body {
  padding: 12px 16px;
  overflow-y: auto;
  font-size: 13px;
  line-height: 1.4;
}

.nf-modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
}

/* Tabs */
.nf-tabs {
  display: flex;
  padding: 2px;
  margin-bottom: 14px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
}

.nf-tab {
  flex: 1;
  padding: 5px 0;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  background: transparent;
  color: inherit;
  opacity: 0.4;
  border-radius: 4px;
  font-family: inherit;
  transition: opacity 0.12s, background 0.12s;
}

.nf-tab:hover {
  opacity: 0.6;
}

.nf-tab.nf-tab-active {
  opacity: 1;
  background: rgba(255, 255, 255, 0.08);
}

/* Form fields */
.nf-form-group {
  margin-bottom: 12px;
}

.nf-form-group:last-child {
  margin-bottom: 0;
}

.nf-form-label {
  display: block;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 4px;
  opacity: 0.4;
}

.nf-form-input {
  width: 100%;
  padding: 6px 8px;
  border-radius: 5px;
  border: 1px solid;
  font-size: 12px;
  background: transparent;
  color: inherit;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
}

.nf-form-input::placeholder {
  opacity: 0.25;
}

.nf-form-input:focus {
  border-color: #00AD9F;
}

.nf-form-hint {
  font-size: 10px;
  margin-top: 3px;
  opacity: 0.3;
}

.nf-error-box {
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 12px;
  margin-bottom: 12px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* Custom select dropdown — replaces native <select> */
.nf-custom-select {
  position: relative;
  border: 1px solid;
  border-radius: 5px;
}

.nf-custom-select-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  background: transparent;
  color: inherit;
  border: none;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
}

.nf-custom-select-options {
  position: absolute;
  top: 100%;
  left: -1px;
  right: -1px;
  border: 1px solid;
  border-radius: 5px;
  overflow: hidden;
  z-index: 10;
}

.nf-custom-select-option {
  width: 100%;
  padding: 6px 8px;
  background: transparent;
  color: inherit;
  border: none;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
}

.nf-custom-select-option:hover {
  background: rgba(255, 255, 255, 0.06);
}

.nf-custom-select-option.nf-option-selected {
  background: rgba(0, 173, 159, 0.1);
}

.nf-account-name {
  font-size: 12px;
  opacity: 0.6;
  padding: 2px 0;
}

/* Site list */
.nf-site-list {
  max-height: 180px;
  overflow-y: auto;
  border-radius: 5px;
  border: 1px solid;
}

.nf-site-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  background: transparent;
  color: inherit;
  width: 100%;
  text-align: left;
  font-family: inherit;
}

.nf-site-item:hover {
  background: rgba(255, 255, 255, 0.04);
}

.nf-site-item.nf-site-selected {
  background: rgba(0, 173, 159, 0.1);
}

.nf-site-subdomain {
  font-size: 10px;
  opacity: 0.35;
}

/* Buttons */
.nf-btn {
  padding: 7px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  transition: opacity 0.12s;
}

.nf-btn:hover {
  filter: brightness(0.9);
}

.nf-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.nf-btn-primary {
  background: #00AD9F;
  color: #fff;
}

.nf-spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: nfSpin 0.6s linear infinite;
  margin-right: 6px;
}

@keyframes nfSpin {
  to { transform: rotate(360deg); }
}
`;

function useInjectStyles() {
  useEffect(() => {
    if (document.getElementById(NF_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = NF_STYLE_ID;
    style.textContent = NETLIFY_CSS;
    document.head.appendChild(style);
    return () => {
      document.getElementById(NF_STYLE_ID)?.remove();
    };
  }, []);
}

// ---------------------------------------------------------------------------
// Plugin Context
// ---------------------------------------------------------------------------

interface PluginContextValue {
  pluginId: string;
  project: {
    name: string;
    path: string;
    currentBranch: string;
    hasUncommittedChanges: boolean;
  } | null;
  actions: {
    showToast: (message: string, type?: 'success' | 'error') => void;
    refreshGitStatus: () => void;
    refreshBranches: () => void;
    focusTerminal: () => void;
    openUrl: (url: string) => void;
  };
  shell: {
    exec: (command: string, args: string[], options?: { timeout?: number }) => Promise<{
      stdout: string;
      stderr: string;
      exit_code: number;
    }>;
  };
  storage: {
    read: () => Promise<Record<string, unknown>>;
    write: (data: Record<string, unknown>) => Promise<void>;
  };
  invoke: {
    call: <T = unknown>(command: string, args?: Record<string, unknown>) => Promise<T>;
  };
  theme: {
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    accent: string;
    accentHover: string;
    action: string;
    actionHover: string;
    actionText: string;
    error: string;
    success: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _w = window as any;

function usePluginContext(): PluginContextValue {
  const React = _w.__SHIPSTUDIO_REACT__;
  const CtxRef = _w.__SHIPSTUDIO_PLUGIN_CONTEXT_REF__;

  if (CtxRef && React?.useContext) {
    const ctx = React.useContext(CtxRef) as PluginContextValue | null;
    if (ctx) return ctx;
  }

  throw new Error('Plugin context not available.');
}

// ---------------------------------------------------------------------------
// Domain Types
// ---------------------------------------------------------------------------

interface NetlifyCliStatus {
  installed: boolean;
  authenticated: boolean;
}

interface NetlifyAccount {
  name: string;
  slug: string;
  id: string;
}

interface LinkedSite {
  siteId: string;
  siteName: string;
  accountSlug: string;
  accountName: string;
  siteUrl: string;
  adminUrl: string;
  linkedAccount: string; // account slug that linked it
  outputDir: string;
}

interface NetlifySite {
  id: string;
  name: string;
  url: string;
  ssl_url: string;
  custom_domain: string;
  admin_url: string;
}

// ---------------------------------------------------------------------------
// Parsing Helpers
// ---------------------------------------------------------------------------

function parseAccounts(jsonStr: string): NetlifyAccount[] {
  try {
    const data = JSON.parse(jsonStr);
    if (!Array.isArray(data)) return [];
    return data
      .filter((a: any) => a.name && a.slug && a.id)
      .map((a: any) => ({ name: a.name, slug: a.slug, id: a.id }));
  } catch {
    return [];
  }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getSiteDisplayName(s: any): string {
  if (s.name && !UUID_RE.test(s.name)) return s.name;
  // Extract subdomain from URL: "https://foo.netlify.app" → "foo"
  const urlStr = s.ssl_url || s.url || '';
  const match = urlStr.match(/\/\/([^.]+)\./);
  if (match && !UUID_RE.test(match[1])) return match[1];
  return '(unnamed site)';
}

function parseSitesList(data: any): NetlifySite[] {
  try {
    const arr = typeof data === 'string' ? JSON.parse(data) : data;
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((s: any) => s.id)
      .map((s: any) => ({
        id: s.id,
        name: getSiteDisplayName(s),
        url: s.url || '',
        ssl_url: s.ssl_url || s.url || '',
        custom_domain: s.custom_domain || '',
        admin_url: s.admin_url || '',
      }));
  } catch {
    return [];
  }
}

async function detectOutputDir(
  shell: PluginContextValue['shell']
): Promise<string> {
  // Check package.json for framework hints first — most reliable
  let hasPackageJson = false;
  try {
    const result = await shell.exec('cat', ['package.json']);
    if (result.exit_code === 0) {
      hasPackageJson = true;
      const pkg = result.stdout.toLowerCase();

      // Next.js — output depends on config: 'out' if static export, '.next' otherwise
      if (pkg.includes('"next"') || pkg.includes("'next'")) {
        return await detectNextOutputDir(shell);
      }
      if (pkg.includes('"nuxt"') || pkg.includes("'nuxt'")) return '.output/public';
      if (pkg.includes('"vite"') || pkg.includes('"astro"') || pkg.includes('"svelte"') || pkg.includes('"@sveltejs/kit"')) return 'dist';
      if (pkg.includes('"react-scripts"')) return 'build';
      if (pkg.includes('"gatsby"')) return 'public';
    }
  } catch {
    // ignore
  }

  // Fall back to checking which output directories exist
  const candidates = ['dist', 'build', 'out', '.next', 'public'];
  for (const dir of candidates) {
    try {
      const result = await shell.exec('test', ['-d', dir]);
      if (result.exit_code === 0) return dir;
    } catch {
      // ignore
    }
  }

  // No package.json and no known output dirs — likely a plain HTML site
  if (!hasPackageJson) return '.';

  return 'dist';
}

/** Detect the correct output dir for a Next.js project. */
async function detectNextOutputDir(
  shell: PluginContextValue['shell']
): Promise<string> {
  // Check next.config.* for output: 'export' (static export → 'out') or custom distDir
  const configFiles = ['next.config.js', 'next.config.mjs', 'next.config.ts'];
  for (const file of configFiles) {
    try {
      const result = await shell.exec('cat', [file]);
      if (result.exit_code === 0) {
        const content = result.stdout;

        // Check for custom distDir
        const distDirMatch = content.match(/distDir\s*:\s*['"]([^'"]+)['"]/);

        // Static export: output: 'export' → builds to 'out' (or custom distDir)
        if (/output\s*:\s*['"]export['"]/.test(content)) {
          return distDirMatch ? distDirMatch[1] : 'out';
        }

        // If distDir is set but not static export, use that
        if (distDirMatch) {
          return distDirMatch[1];
        }

        // Config exists but no static export → default SSR build
        return '.next';
      }
    } catch {
      // try next config file
    }
  }

  // No config file found — default Next.js SSR output
  return '.next';
}

/** Check if the project has a `build` script in package.json. */
async function hasBuildScript(
  shell: PluginContextValue['shell'],
): Promise<boolean> {
  try {
    const result = await shell.exec('cat', ['package.json']);
    if (result.exit_code !== 0) return false;
    const pkg = JSON.parse(result.stdout);
    return !!(pkg.scripts && pkg.scripts.build);
  } catch {
    return false;
  }
}

function shellEscape(arg: string): string {
  if (/^[a-zA-Z0-9._\-\/]+$/.test(arg)) return arg;
  return "'" + arg.replace(/'/g, "'\\''") + "'";
}

/**
 * Parse `git remote -v` output and return the GitHub `owner/repo` path.
 * Handles SSH (`git@github.com:owner/repo.git`) and HTTPS (`https://github.com/owner/repo.git`).
 * Returns `null` for non-GitHub remotes.
 */
function parseGitHubRepo(remoteOutput: string): string | null {
  // Match origin line (fetch or push)
  const lines = remoteOutput.split('\n');
  for (const line of lines) {
    if (!line.startsWith('origin')) continue;
    // SSH: git@github.com:owner/repo.git
    const sshMatch = line.match(/github\.com[:/]([^/]+\/[^/\s]+?)(?:\.git)?(?:\s|$)/);
    if (sshMatch) return sshMatch[1];
    // HTTPS: https://github.com/owner/repo.git
    const httpsMatch = line.match(/github\.com\/([^/]+\/[^/\s]+?)(?:\.git)?(?:\s|$)/);
    if (httpsMatch) return httpsMatch[1];
  }
  return null;
}

/**
 * Check whether the Netlify site has CI/CD (GitHub App) properly linked.
 * Returns `true` if linked, `false` if not, `null` on error (unknown).
 */
async function checkAutoDeployStatus(
  shell: PluginContextValue['shell'],
  siteId: string,
): Promise<boolean | null> {
  try {
    const result = await netlifyApi(shell, 'GET', `/sites/${siteId}`, undefined, { timeout: 15000 });
    if (!result.ok) return null;
    const installationId = result.data?.build_settings?.installation_id;
    return !!installationId;
  } catch {
    return null;
  }
}

/** Run `npx --yes netlify-cli <args>` with bumped file-descriptor limit. */
async function execNetlify(
  shell: PluginContextValue['shell'],
  args: string[],
  options?: { timeout?: number },
): Promise<{ stdout: string; stderr: string; exit_code: number }> {
  const escaped = args.map(shellEscape).join(' ');
  return shell.exec('sh', ['-c', `ulimit -n 8192 2>/dev/null; npx --yes netlify-cli ${escaped}`], options);
}

/** Read the Netlify auth token from the CLI config file. */
async function getNetlifyToken(
  shell: PluginContextValue['shell'],
): Promise<string | null> {
  try {
    const result = await shell.exec('sh', ['-c',
      `python3 -c "import json;d=json.load(open('$HOME/Library/Preferences/netlify/config.json'));print(d['users'][d['userId']]['auth']['token'])" 2>/dev/null`
    ]);
    if (result.exit_code === 0 && result.stdout.trim()) {
      return result.stdout.trim();
    }
  } catch { /* ignore */ }
  return null;
}

/** Call the Netlify REST API directly via curl for better error handling. */
async function netlifyApi(
  shell: PluginContextValue['shell'],
  method: string,
  path: string,
  body?: Record<string, unknown>,
  options?: { timeout?: number },
): Promise<{ ok: boolean; status: number; data: any }> {
  const token = await getNetlifyToken(shell);
  if (!token) throw new Error('Not authenticated');

  const bodyFlag = body ? `-d ${shellEscape(JSON.stringify(body))}` : '';
  const result = await shell.exec('sh', ['-c',
    `curl -s -w '\\nHTTP_STATUS:%{http_code}' -X ${method} 'https://api.netlify.com/api/v1${path}' -H 'Authorization: Bearer ${token}' -H 'Content-Type: application/json' ${bodyFlag}`
  ], options);

  const lines = result.stdout.trim().split('\n');
  const statusLine = lines.pop() || '';
  const statusMatch = statusLine.match(/HTTP_STATUS:(\d+)/);
  const status = statusMatch ? parseInt(statusMatch[1], 10) : 0;
  const responseBody = lines.join('\n');

  let data: any = null;
  try { data = JSON.parse(responseBody); } catch { data = responseBody; }

  return { ok: status >= 200 && status < 300, status, data };
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function NetlifyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="currentColor">
      <path key="tl" d="M43.91,116.64h-1.34l-6.67-6.67v-1.34l10.19-10.19h7.06l.94,.94v7.06l-10.19,10.19Z" />
      <path key="tr" d="M35.9,41.22v-1.34l6.67-6.67h1.34l10.19,10.19v7.06l-.94,.94h-7.06l-10.19-10.19Z" />
      <path key="n" d="M94.6,95.14h-9.7l-.81-.81v-22.71c0-4.04-1.59-7.17-6.46-7.28-2.51-.07-5.38,0-8.44,.12l-.46,.47v29.39l-.81,.81h-9.7l-.81-.81V55.53l.81-.81h21.83c8.48,0,15.36,6.88,15.36,15.36v24.25l-.81,.81Z" />
      <path key="l" d="M45.29,80.6H6.49l-.81-.81v-9.72l.81-.81H45.29l.81,.81v9.72l-.81,.81Z" />
      <path key="r" d="M146.34,80.6h-38.8l-.81-.81v-9.72l.81-.81h38.8l.81,.81v9.72l-.81,.81Z" />
      <path key="t" d="M70.82,42.6V13.5l.81-.81h9.72l.81,.81v29.1l-.81,.81h-9.72l-.81-.81Z" />
      <path key="b" d="M70.82,136.36v-29.1l.81-.81h9.72l.81,.81v29.1l-.81,.81h-9.72l-.81-.81Z" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function SwitchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function DisconnectIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function DeployIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Connect Modal
// ---------------------------------------------------------------------------

function ConnectModal({
  onClose,
  accounts,
  shell,
  storage,
  showToast,
  theme,
  onLinked,
}: {
  onClose: () => void;
  accounts: NetlifyAccount[];
  shell: PluginContextValue['shell'];
  storage: PluginContextValue['storage'];
  showToast: PluginContextValue['actions']['showToast'];
  theme: PluginContextValue['theme'];
  onLinked: (site: LinkedSite) => void;
}) {
  const [tab, setTab] = useState<'create' | 'link'>('create');
  const [selectedAccountSlug, setSelectedAccountSlug] = useState(accounts[0]?.slug ?? '');
  const [siteName, setSiteName] = useState('');
  const [outputDir, setOutputDir] = useState('dist');
  const [detectingDir, setDetectingDir] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Existing sites for "link" tab
  const [existingSites, setExistingSites] = useState<NetlifySite[]>([]);
  const [loadingSites, setLoadingSites] = useState(false);
  const [selectedExisting, setSelectedExisting] = useState<string | null>(null);

  // Auto-detect output directory
  useEffect(() => {
    let cancelled = false;
    detectOutputDir(shell).then((dir) => {
      if (!cancelled) {
        setOutputDir(dir);
        setDetectingDir(false);
      }
    });
    return () => { cancelled = true; };
  }, [shell]);

  // Load existing sites when link tab selected
  useEffect(() => {
    if (tab !== 'link' || !selectedAccountSlug) return;
    let cancelled = false;
    setLoadingSites(true);
    setExistingSites([]);
    setSelectedExisting(null);

    netlifyApi(shell, 'GET', `/${selectedAccountSlug}/sites`, undefined, { timeout: 30000 })
      .then((result) => {
        if (cancelled) return;
        if (result.ok) {
          setExistingSites(parseSitesList(result.data));
        }
        setLoadingSites(false);
      })
      .catch(() => {
        if (!cancelled) setLoadingSites(false);
      });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, selectedAccountSlug]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const sanitizeSiteName = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const getSelectedAccount = (): NetlifyAccount | undefined => {
    return accounts.find((a) => a.slug === selectedAccountSlug);
  };

  const handleCreate = useCallback(async () => {
    if (!selectedAccountSlug) {
      setError('Please select an account.');
      return;
    }

    const sanitized = sanitizeSiteName(siteName);
    setError(null);
    setLoading(true);

    try {
      // Create the site via direct API call (CLI commands are buggy)
      const body: Record<string, string> = {};
      if (sanitized) body.name = sanitized;

      let createResponse = await netlifyApi(
        shell, 'POST', `/${selectedAccountSlug}/sites`,
        body,
        { timeout: 30000 },
      );

      // If name is taken, retry without a name — Netlify auto-generates a unique one
      if (!createResponse.ok && sanitized) {
        createResponse = await netlifyApi(
          shell, 'POST', `/${selectedAccountSlug}/sites`,
          {},
          { timeout: 30000 },
        );
      }

      if (!createResponse.ok) {
        const errData = createResponse.data;
        let msg = 'Failed to create site.';
        if (errData?.errors) {
          const details = Object.entries(errData.errors)
            .map(([k, v]) => `${k} ${(v as string[]).join(', ')}`)
            .join('; ');
          msg = details;
        }
        setError(msg);
        setLoading(false);
        return;
      }

      const siteData = createResponse.data;
      const siteId: string = siteData?.id || '';
      const actualName: string = siteData?.name || sanitized || '';
      const siteUrl: string = siteData?.ssl_url || `https://${actualName}.netlify.app`;
      const adminUrl: string = siteData?.admin_url || `https://app.netlify.com/sites/${actualName}`;

      // Write .netlify/state.json so CLI knows this site is linked
      if (siteId) {
        await shell.exec('sh', ['-c', `mkdir -p .netlify && echo '${JSON.stringify({ siteId })}' > .netlify/state.json`]);
      }

      const account = getSelectedAccount();
      const deployDir = outputDir.trim() || '.';
      const linked: LinkedSite = {
        siteId,
        siteName: actualName,
        accountSlug: selectedAccountSlug,
        accountName: account?.name ?? '',
        siteUrl,
        adminUrl,
        linkedAccount: selectedAccountSlug,
        outputDir: deployDir,
      };

      // Save to plugin storage
      await storage.write(linked as unknown as Record<string, unknown>);

      // Build then deploy
      try {
        // Only run build if the project has a build script
        const canBuild = await hasBuildScript(shell);
        if (canBuild) {
          showToast('Building project...', 'success');
          const buildResult = await shell.exec('npm', ['run', 'build'], { timeout: 300000 });
          if (buildResult.exit_code !== 0) {
            setError(`Build failed: ${buildResult.stderr || buildResult.stdout}`);
            setLoading(false);
            return;
          }

          // Verify output directory exists (only for non-root deploy dirs)
          if (deployDir !== '.') {
            const dirCheck = await shell.exec('test', ['-d', deployDir]);
            if (dirCheck.exit_code !== 0) {
              setError(`Build succeeded but "${deployDir}" folder was not created. Check your framework's output settings.`);
              setLoading(false);
              return;
            }
          }
        }

        showToast('Deploying to Netlify...', 'success');
        const deployResult = await execNetlify(shell, [
          'deploy', '--dir', deployDir, '--prod', '--json',
        ], { timeout: 300000 });

        if (deployResult.exit_code === 0) {
          try {
            const deployData = JSON.parse(deployResult.stdout);
            if (deployData.site_url) {
              linked.siteUrl = deployData.site_url;
              await storage.write(linked as unknown as Record<string, unknown>);
            }
          } catch {
            // Non-critical — keep fallback URL
          }
          showToast('Deployed to Netlify!', 'success');
        } else {
          showToast('Site created but deploy failed. Try "Deploy Now" from the menu.', 'error');
        }
      } catch {
        showToast('Site created! Deploy may still be running.', 'success');
      }

      onLinked(linked);
      onClose();
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, [siteName, selectedAccountSlug, outputDir, shell, storage, showToast, onLinked, onClose]);

  const handleLink = useCallback(async () => {
    if (!selectedExisting) {
      setError('Please select a site.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const site = existingSites.find((s) => s.id === selectedExisting);
      if (!site) {
        setError('Selected site not found.');
        setLoading(false);
        return;
      }

      // Write .netlify/state.json directly (avoids buggy netlify link command)
      const linkResult = await shell.exec('sh', [
        '-c', `mkdir -p .netlify && echo '${JSON.stringify({ siteId: site.id })}' > .netlify/state.json`,
      ]);
      if (linkResult.exit_code !== 0) {
        setError(`Failed to link: could not write .netlify/state.json`);
        setLoading(false);
        return;
      }

      const account = getSelectedAccount();
      const linked: LinkedSite = {
        siteId: site.id,
        siteName: site.name,
        accountSlug: selectedAccountSlug,
        accountName: account?.name ?? '',
        siteUrl: site.ssl_url || site.url,
        adminUrl: site.admin_url || `https://app.netlify.com/sites/${site.id}`,
        linkedAccount: selectedAccountSlug,
        outputDir,
      };

      await storage.write(linked as unknown as Record<string, unknown>);
      showToast(`Linked to ${site.name}`, 'success');

      onLinked(linked);
      onClose();
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, [selectedExisting, selectedAccountSlug, outputDir, existingSites, shell, storage, showToast, onLinked, onClose]);

  const selectedAccount = getSelectedAccount();

  return (
    <div className="nf-modal-overlay" onClick={onClose}>
      <div
        className="nf-modal"
        style={{ background: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="nf-modal-header" style={{ borderBottom: `1px solid ${theme.border}` }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <NetlifyIcon size={14} />
            Connect Netlify Site
          </span>
          <button
            className="nf-close-btn"
            onClick={onClose}
            style={{ color: theme.textMuted }}
          >
            ✕
          </button>
        </div>

        <div className="nf-modal-body">
          {error && <div className="nf-error-box">{error}</div>}

          <div className="nf-tabs">
            <button
              className={`nf-tab ${tab === 'create' ? 'nf-tab-active' : ''}`}
              onClick={() => { setTab('create'); setError(null); }}
            >
              Create New
            </button>
            <button
              className={`nf-tab ${tab === 'link' ? 'nf-tab-active' : ''}`}
              onClick={() => { setTab('link'); setError(null); }}
            >
              Link Existing
            </button>
          </div>

          {accounts.length > 1 && (
            <div className="nf-form-group">
              <label className="nf-form-label">Account</label>
              <div className="nf-custom-select" style={{ borderColor: theme.border }}>
                <button
                  className="nf-custom-select-trigger"
                  onClick={() => {
                    const el = document.getElementById('nf-account-dropdown');
                    if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
                  }}
                  type="button"
                >
                  <span>{selectedAccount ? selectedAccount.name : 'Select account'}</span>
                  <span style={{ opacity: 0.4, fontSize: 10 }}>▼</span>
                </button>
                <div id="nf-account-dropdown" className="nf-custom-select-options" style={{ display: 'none', background: theme.bgPrimary, borderColor: theme.border }}>
                  {accounts.map((a) => (
                    <button
                      key={a.id}
                      className={`nf-custom-select-option ${selectedAccountSlug === a.slug ? 'nf-option-selected' : ''}`}
                      onClick={() => {
                        setSelectedAccountSlug(a.slug);
                        const el = document.getElementById('nf-account-dropdown');
                        if (el) el.style.display = 'none';
                      }}
                      type="button"
                    >
                      {a.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'create' ? (
            <>
              <div className="nf-form-group">
                <label className="nf-form-label">Site Name (optional)</label>
                <input
                  className="nf-form-input"
                  style={{ borderColor: theme.border }}
                  type="text"
                  placeholder="leave blank to auto-generate"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                {siteName && sanitizeSiteName(siteName) !== siteName && (
                  <div className="nf-form-hint">
                    Will be created as: {sanitizeSiteName(siteName)}
                  </div>
                )}
              </div>
              <div className="nf-form-group">
                <label className="nf-form-label">Output Directory</label>
                <input
                  className="nf-form-input"
                  style={{ borderColor: theme.border }}
                  type="text"
                  value={outputDir}
                  onChange={(e) => setOutputDir(e.target.value)}
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <div className="nf-form-hint">
                  {detectingDir ? 'Detecting...' : 'The folder your build tool outputs to (e.g. dist, build, out)'}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="nf-form-group">
                <label className="nf-form-label">Select Site</label>
                {loadingSites ? (
                  <div style={{ padding: '8px 0', fontSize: 12, opacity: 0.5 }}>
                    <span className="nf-spinner" /> Loading sites...
                  </div>
                ) : existingSites.length === 0 ? (
                  <div style={{ padding: '8px 0', fontSize: 12, opacity: 0.5 }}>
                    No sites found. Create one in the other tab.
                  </div>
                ) : (
                  <div className="nf-site-list" style={{ borderColor: theme.border }}>
                    {existingSites.map((s) => (
                      <button
                        key={s.id}
                        className={`nf-site-item ${selectedExisting === s.id ? 'nf-site-selected' : ''}`}
                        onClick={() => setSelectedExisting(s.id)}
                      >
                        <span>{s.custom_domain || s.name}</span>
                        <span className="nf-site-subdomain">{s.custom_domain ? (s.ssl_url || s.url) : ''}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="nf-form-group">
                <label className="nf-form-label">Output Directory</label>
                <input
                  className="nf-form-input"
                  style={{ borderColor: theme.border }}
                  type="text"
                  value={outputDir}
                  onChange={(e) => setOutputDir(e.target.value)}
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <div className="nf-form-hint">
                  {detectingDir ? 'Detecting...' : 'The folder your build tool outputs to (e.g. dist, build, out)'}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="nf-modal-footer" style={{ borderTop: `1px solid ${theme.border}` }}>
          {tab === 'create' ? (
            <button
              className="nf-btn nf-btn-primary"
              onClick={handleCreate}
              disabled={loading}
            >
              {loading ? (
                <><span className="nf-spinner" /> Deploying...</>
              ) : (
                'Connect & Deploy'
              )}
            </button>
          ) : (
            <button
              className="nf-btn nf-btn-primary"
              onClick={handleLink}
              disabled={loading || !selectedExisting}
            >
              {loading ? (
                <><span className="nf-spinner" /> Linking...</>
              ) : (
                'Link Site'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Connected Dropdown
// ---------------------------------------------------------------------------

function ConnectedDropdown({
  linked,
  currentBranch,
  actions,
  onUnlink,
  onSignOut,
  onDeploy,
  isDeploying,
  autoDeployLinked,
  onSetupAutoDeploy,
}: {
  linked: LinkedSite;
  currentBranch: string | null;
  actions: PluginContextValue['actions'];
  onUnlink: () => void;
  onSignOut: () => void;
  onDeploy: () => void;
  isDeploying: boolean;
  autoDeployLinked: boolean | null;
  onSetupAutoDeploy: () => void;
}) {
  const prodUrl = linked.siteUrl || `https://${linked.siteName}.netlify.app`;
  const prodLabel = prodUrl.replace('https://', '');
  const dashboardUrl = linked.adminUrl || `https://app.netlify.com/sites/${linked.siteName}`;

  // Branch preview URL
  const branchPreviewUrl = currentBranch && currentBranch !== 'main' && currentBranch !== 'master'
    ? `https://${currentBranch}--${linked.siteName}.netlify.app`
    : null;

  return (
    <div className="nf-dropdown">
      <div className="nf-dropdown-inner">
        {/* Prod URL */}
        <button
          onClick={(e) => { e.stopPropagation(); actions.openUrl(prodUrl); }}
        >
          <span className="nf-badge nf-badge-prod">Prod</span>
          <span className="nf-site-url">{prodLabel}</span>
          <ExternalLinkIcon />
        </button>

        {/* Branch preview URL */}
        {branchPreviewUrl && (
          <button
            onClick={(e) => { e.stopPropagation(); actions.openUrl(branchPreviewUrl); }}
          >
            <span className="nf-badge nf-badge-preview">Branch</span>
            <span className="nf-site-url">{currentBranch}--{linked.siteName}.netlify.app</span>
            <ExternalLinkIcon />
          </button>
        )}

        {/* Dashboard */}
        <button
          onClick={(e) => { e.stopPropagation(); actions.openUrl(dashboardUrl); }}
        >
          <span className="nf-badge nf-badge-dashboard">Dash</span>
          <span className="nf-site-url">app.netlify.com</span>
          <ExternalLinkIcon />
        </button>

        {/* Auto-deploy status */}
        {autoDeployLinked === true && (
          <button
            onClick={(e) => { e.stopPropagation(); actions.openUrl(`${dashboardUrl}/configuration/deploys`); }}
          >
            <span className="nf-badge nf-badge-ci">CI/CD</span>
            <span className="nf-site-url">Auto-deploy from {currentBranch || 'main'}</span>
            <ExternalLinkIcon />
          </button>
        )}
        {autoDeployLinked === false && (
          <button
            className="nf-dropdown-action"
            onClick={(e) => { e.stopPropagation(); onSetupAutoDeploy(); }}
          >
            <DeployIcon />
            Set up auto-deploy
          </button>
        )}

        <div className="nf-dropdown-divider" />

        {/* Deploy */}
        <button
          className="nf-dropdown-action"
          onClick={(e) => { e.stopPropagation(); onDeploy(); }}
          disabled={isDeploying}
        >
          <DeployIcon />
          {isDeploying ? 'Deploying...' : 'Deploy Now'}
        </button>

        <div className="nf-dropdown-divider" />

        {/* Disconnect */}
        <button
          className="nf-dropdown-action nf-action-danger"
          onClick={(e) => { e.stopPropagation(); onUnlink(); }}
        >
          <DisconnectIcon />
          Disconnect Project
        </button>

        {/* Sign out */}
        <button
          className="nf-dropdown-action nf-action-danger"
          onClick={(e) => { e.stopPropagation(); onSignOut(); }}
        >
          <SignOutIcon />
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Toolbar Component
// ---------------------------------------------------------------------------

type PluginState = 'CHECKING' | 'NOT_INSTALLED' | 'NOT_AUTHENTICATED' | 'WRONG_ACCOUNT' | 'NOT_LINKED' | 'DEPLOYING' | 'CONNECTED';

function NetlifyToolbar() {
  const ctx = usePluginContext();
  const shell = ctx.shell;
  const storage = ctx.storage;
  const showToast = ctx.actions.showToast;
  const theme = ctx.theme;
  const actions = ctx.actions;

  useInjectStyles();

  // Stabilize context refs — ctx.shell / ctx.storage are new objects every render
  const shellRef = useRef(shell);
  shellRef.current = shell;
  const storageRef = useRef(storage);
  storageRef.current = storage;

  const [cliStatus, setCliStatus] = useState<NetlifyCliStatus | null>(null);
  const [accounts, setAccounts] = useState<NetlifyAccount[]>([]);
  const [linked, setLinked] = useState<LinkedSite | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [hasGitRemote, setHasGitRemote] = useState(false);
  const [autoDeployLinked, setAutoDeployLinked] = useState<boolean | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derive state
  const state: PluginState = (() => {
    if (cliStatus === null) return 'CHECKING';
    if (!cliStatus.installed) return 'NOT_INSTALLED';
    if (!cliStatus.authenticated) return 'NOT_AUTHENTICATED';
    if (linked && accounts.length > 0 && !accounts.some((a) => a.slug === linked.linkedAccount)) return 'WRONG_ACCOUNT';
    if (isDeploying) return 'DEPLOYING';
    if (linked) return 'CONNECTED';
    return 'NOT_LINKED';
  })();

  // Check CLI status on mount (runs once)
  useEffect(() => {
    let cancelled = false;

    async function check() {
      const sh = shellRef.current;
      const st = storageRef.current;
      try {
        const versionResult = await execNetlify(sh, ['--version'], { timeout: 30000 });
        if (cancelled) return;

        if (versionResult.exit_code !== 0) {
          setCliStatus({ installed: false, authenticated: false });
          return;
        }

        const accountsResult = await execNetlify(sh, [
          'api', 'listAccountsForUser', '--data', '{}',
        ], { timeout: 30000 });
        if (cancelled) return;

        if (accountsResult.exit_code !== 0) {
          setCliStatus({ installed: true, authenticated: false });
          return;
        }

        const parsedAccounts = parseAccounts(accountsResult.stdout);
        if (parsedAccounts.length === 0) {
          setCliStatus({ installed: true, authenticated: false });
          return;
        }

        if (cancelled) return;
        setAccounts(parsedAccounts);
        setCliStatus({ installed: true, authenticated: true });

        // Step 3: Check plugin storage for linked site
        try {
          const data = await st.read();
          if (data.siteId && data.siteName) {
            setLinked(data as unknown as LinkedSite);
            // Check auto-deploy status for the linked site
            const status = await checkAutoDeployStatus(sh, data.siteId as string);
            if (!cancelled) setAutoDeployLinked(status);
          }
        } catch {
          // Storage empty or corrupt — not linked
        }
      } catch {
        if (!cancelled) {
          setCliStatus({ installed: false, authenticated: false });
        }
      }
    }

    check();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll for git remote (re-check every 3s while no remote is detected)
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function poll() {
      try {
        const result = await shellRef.current.exec('git', ['remote', '-v'], { timeout: 5000 });
        if (cancelled) return;
        const found = result.exit_code === 0 && result.stdout.trim().length > 0;
        setHasGitRemote(found);
        if (!found) {
          timer = setTimeout(poll, 3000);
        }
      } catch {
        if (!cancelled) {
          setHasGitRemote(false);
          timer = setTimeout(poll, 3000);
        }
      }
    }

    poll();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showDropdown) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDropdown]);

  const handleInstall = useCallback(async () => {
    setInstalling(true);
    showToast('Installing Netlify CLI (this may take a moment)...', 'success');
    try {
      // Use npx to download and cache netlify-cli — no global install needed
      const result = await execNetlify(shell, ['--version'], { timeout: 120000 });
      if (result.exit_code === 0) {
        showToast('Netlify CLI installed!', 'success');
        setCliStatus({ installed: true, authenticated: false });
      } else {
        showToast(`Install failed: ${result.stderr}`, 'error');
      }
    } catch (err) {
      showToast(`Install failed: ${err instanceof Error ? err.message : String(err)}`, 'error');
    } finally {
      setInstalling(false);
    }
  }, [shell, showToast]);

  const handleLogin = useCallback(async () => {
    showToast('Opening Netlify login...', 'success');
    try {
      const result = await execNetlify(shell, ['login'], { timeout: 120000 });
      if (result.exit_code === 0) {
        // Verify auth by listing accounts
        const accountsResult = await execNetlify(shell, [
          'api', 'listAccountsForUser', '--data', '{}',
        ], { timeout: 15000 });

        const parsedAccounts = accountsResult.exit_code === 0
          ? parseAccounts(accountsResult.stdout)
          : [];

        setAccounts(parsedAccounts);
        if (parsedAccounts.length > 0) {
          setCliStatus({ installed: true, authenticated: true });
          showToast('Connected to Netlify!', 'success');
        } else {
          setCliStatus({ installed: true, authenticated: false });
          showToast('Authentication failed. Please try again.', 'error');
        }
      } else {
        showToast('Login failed or was cancelled.', 'error');
      }
    } catch {
      showToast('Login timed out or failed.', 'error');
    }
  }, [shell, showToast]);

  const handleDeploy = useCallback(async () => {
    if (!linked) return;
    setIsDeploying(true);
    setShowDropdown(false);

    try {
      const deployDir = linked.outputDir || '.';

      // Only run build if the project has a build script
      const canBuild = await hasBuildScript(shell);
      if (canBuild) {
        showToast('Building project...', 'success');
        const buildResult = await shell.exec('npm', ['run', 'build'], { timeout: 300000 });
        if (buildResult.exit_code !== 0) {
          showToast(`Build failed: ${buildResult.stderr || buildResult.stdout}`, 'error');
          setIsDeploying(false);
          return;
        }

        // Verify output directory exists (only for non-root deploy dirs)
        if (deployDir !== '.') {
          const dirCheck = await shell.exec('test', ['-d', deployDir]);
          if (dirCheck.exit_code !== 0) {
            showToast(`Build succeeded but "${deployDir}" folder not found. Check your framework's output settings.`, 'error');
            setIsDeploying(false);
            return;
          }
        }
      }

      showToast('Deploying to Netlify...', 'success');
      const result = await execNetlify(shell, [
        'deploy', '--dir', deployDir, '--prod', '--json',
      ], { timeout: 300000 });

      if (result.exit_code === 0) {
        // Update siteUrl from deploy response
        try {
          const deployData = JSON.parse(result.stdout);
          if (deployData.site_url && deployData.site_url !== linked.siteUrl) {
            const updated = { ...linked, siteUrl: deployData.site_url };
            setLinked(updated);
            await storage.write(updated as unknown as Record<string, unknown>);
          }
        } catch { /* Non-critical */ }
        showToast('Deployed to Netlify!', 'success');
      } else {
        showToast(`Deploy failed: ${result.stderr}`, 'error');
      }
    } catch {
      showToast('Deploy may still be running.', 'success');
    } finally {
      setIsDeploying(false);
    }
  }, [linked, shell, showToast, storage]);

  const handleUnlink = useCallback(async () => {
    try {
      // Remove .netlify/state.json
      await shell.exec('rm', ['-f', '.netlify/state.json']);
      // Clear plugin storage
      await storage.write({});
      setLinked(null);
      setShowDropdown(false);
      showToast('Disconnected from Netlify.', 'success');
    } catch {
      showToast('Failed to disconnect.', 'error');
    }
  }, [shell, storage, showToast]);

  const handleSignOut = useCallback(async () => {
    setShowDropdown(false);
    try {
      await execNetlify(shell, ['logout'], { timeout: 30000 });
      await storage.write({});
      setLinked(null);
      setAccounts([]);
      setCliStatus({ installed: true, authenticated: false });
      showToast('Signed out of Netlify.', 'success');
    } catch {
      showToast('Failed to sign out.', 'error');
    }
  }, [shell, storage, showToast]);

  const handleLinked = useCallback((site: LinkedSite) => {
    setLinked(site);
    setAutoDeployLinked(null); // reset while checking
    checkAutoDeployStatus(shellRef.current, site.siteId).then(setAutoDeployLinked);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setShowDropdown(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  }, []);

  const currentBranch = ctx.project?.currentBranch ?? null;

  // Hide until a git remote is configured (unless already connected)
  if (!hasGitRemote && state !== 'CONNECTED') return null;

  // Render based on state
  switch (state) {
    case 'CHECKING':
      return (
        <button
          className="toolbar-icon-btn nf-checking"
          disabled
          title="Connecting to Netlify..."
        >
          <NetlifyIcon />
          <span className="nf-checking-text">Connecting...</span>
        </button>
      );

    case 'NOT_INSTALLED':
      return (
        <button
          className={`toolbar-icon-btn${installing ? ' nf-checking' : ''}`}
          onClick={handleInstall}
          disabled={installing}
          title="Install Netlify CLI"
        >
          <NetlifyIcon />
          {installing ? 'Installing...' : 'Install Netlify CLI'}
        </button>
      );

    case 'NOT_AUTHENTICATED':
      return (
        <button
          className="toolbar-icon-btn"
          onClick={handleLogin}
          title="Connect your Netlify account"
        >
          <NetlifyIcon />
          Connect Netlify
        </button>
      );

    case 'WRONG_ACCOUNT':
      return (
        <div
          className="nf-dropdown-wrapper"
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="toolbar-icon-btn"
            onClick={() => setShowDropdown((v) => !v)}
            title="Account mismatch"
            style={{ color: '#f59e0b' }}
          >
            <NetlifyIcon />
          </button>
          {showDropdown && (
            <div className="nf-dropdown">
              <div className="nf-dropdown-inner">
                <div className="nf-mismatch-text">
                  This site is linked to <strong>{linked?.accountName || 'a different account'}</strong> but you&apos;re signed in to a different account.
                </div>
                <div className="nf-dropdown-divider" />
                <button
                  className="nf-dropdown-action"
                  onClick={(e) => { e.stopPropagation(); handleLogin(); }}
                >
                  <SwitchIcon />
                  Switch Account
                </button>
                <button
                  className="nf-dropdown-action nf-action-danger"
                  onClick={(e) => { e.stopPropagation(); handleUnlink(); }}
                >
                  <DisconnectIcon />
                  Disconnect Project
                </button>
              </div>
            </div>
          )}
        </div>
      );

    case 'NOT_LINKED':
      return (
        <>
          <button
            className="toolbar-icon-btn"
            onClick={() => setShowModal(true)}
            title="Link a Netlify site"
          >
            <NetlifyIcon />
            Link Site
          </button>
          {showModal && (
            <ConnectModal
              onClose={() => setShowModal(false)}
              accounts={accounts}
              shell={shell}
              storage={storage}
              showToast={showToast}
              theme={theme}
              onLinked={handleLinked}
            />
          )}
        </>
      );

    case 'DEPLOYING':
      return (
        <button
          className="toolbar-icon-btn nf-deploying"
          disabled
          title="Deploying to Netlify..."
        >
          <NetlifyIcon />
          <span className="nf-deploying-text">Deploying...</span>
        </button>
      );

    case 'CONNECTED':
      return (
        <div
          className="nf-dropdown-wrapper"
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => !isDeploying && handleMouseLeave()}
        >
          <button
            className="toolbar-icon-btn"
            onClick={() => actions.openUrl(linked!.adminUrl || `https://app.netlify.com/sites/${linked!.siteName}`)}
            title={`${linked!.siteName} — Netlify`}
          >
            <NetlifyIcon />
          </button>
          {showDropdown && (
            <ConnectedDropdown
              linked={linked!}
              currentBranch={currentBranch}
              actions={actions}
              onUnlink={handleUnlink}
              onSignOut={handleSignOut}
              onDeploy={handleDeploy}
              isDeploying={isDeploying}
              autoDeployLinked={autoDeployLinked}
              onSetupAutoDeploy={() => actions.openUrl(`https://app.netlify.com/sites/${linked!.siteName}/configuration/deploys`)}
            />
          )}
        </div>
      );
  }
}

// ---------------------------------------------------------------------------
// Module exports (required by Ship Studio plugin loader)
// ---------------------------------------------------------------------------

export const name = 'Netlify';

export const slots = {
  toolbar: NetlifyToolbar,
};

export function onActivate() {
  console.log('[netlify] Plugin activated');
}

export function onDeactivate() {
  console.log('[netlify] Plugin deactivated');
  const styleEl = document.getElementById(NF_STYLE_ID);
  if (styleEl) styleEl.remove();
}
