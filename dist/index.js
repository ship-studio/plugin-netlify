const __R = window.__SHIPSTUDIO_REACT__;
const { useState, useEffect, useRef, useCallback, useMemo } = __R;
const Fragment = __R.Fragment;
function jsx(t, p) { const { children: c, ...r } = p; return c !== undefined ? __R.createElement(t, r, c) : __R.createElement(t, r); }
function jsxs(t, p) { const { children: c, ...r } = p; return __R.createElement(t, r, ...c); }
const NF_STYLE_ID = "nf-plugin-styles";
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
    const style = document.createElement("style");
    style.id = NF_STYLE_ID;
    style.textContent = NETLIFY_CSS;
    document.head.appendChild(style);
    return () => {
      var _a;
      (_a = document.getElementById(NF_STYLE_ID)) == null ? void 0 : _a.remove();
    };
  }, []);
}
const _w = window;
function usePluginContext() {
  const React = _w.__SHIPSTUDIO_REACT__;
  const CtxRef = _w.__SHIPSTUDIO_PLUGIN_CONTEXT_REF__;
  if (CtxRef && (React == null ? void 0 : React.useContext)) {
    const ctx = React.useContext(CtxRef);
    if (ctx) return ctx;
  }
  throw new Error("Plugin context not available.");
}
function parseAccounts(jsonStr) {
  try {
    const data = JSON.parse(jsonStr);
    if (!Array.isArray(data)) return [];
    return data.filter((a) => a.name && a.slug && a.id).map((a) => ({ name: a.name, slug: a.slug, id: a.id }));
  } catch {
    return [];
  }
}
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function getSiteDisplayName(s) {
  if (s.name && !UUID_RE.test(s.name)) return s.name;
  const urlStr = s.ssl_url || s.url || "";
  const match = urlStr.match(/\/\/([^.]+)\./);
  if (match && !UUID_RE.test(match[1])) return match[1];
  return "(unnamed site)";
}
function parseSitesList(data) {
  try {
    const arr = typeof data === "string" ? JSON.parse(data) : data;
    if (!Array.isArray(arr)) return [];
    return arr.filter((s) => s.id).map((s) => ({
      id: s.id,
      name: getSiteDisplayName(s),
      url: s.url || "",
      ssl_url: s.ssl_url || s.url || "",
      custom_domain: s.custom_domain || "",
      admin_url: s.admin_url || ""
    }));
  } catch {
    return [];
  }
}
async function detectOutputDir(shell) {
  let hasPackageJson = false;
  try {
    const result = await shell.exec("cat", ["package.json"]);
    if (result.exit_code === 0) {
      hasPackageJson = true;
      const pkg = result.stdout.toLowerCase();
      if (pkg.includes('"next"') || pkg.includes("'next'")) {
        return await detectNextOutputDir(shell);
      }
      if (pkg.includes('"nuxt"') || pkg.includes("'nuxt'")) return ".output/public";
      if (pkg.includes('"vite"') || pkg.includes('"astro"') || pkg.includes('"svelte"') || pkg.includes('"@sveltejs/kit"')) return "dist";
      if (pkg.includes('"react-scripts"')) return "build";
      if (pkg.includes('"gatsby"')) return "public";
    }
  } catch {
  }
  const candidates = ["dist", "build", "out", ".next", "public"];
  for (const dir of candidates) {
    try {
      const result = await shell.exec("test", ["-d", dir]);
      if (result.exit_code === 0) return dir;
    } catch {
    }
  }
  if (!hasPackageJson) return ".";
  return "dist";
}
async function detectNextOutputDir(shell) {
  const configFiles = ["next.config.js", "next.config.mjs", "next.config.ts"];
  for (const file of configFiles) {
    try {
      const result = await shell.exec("cat", [file]);
      if (result.exit_code === 0) {
        const content = result.stdout;
        const distDirMatch = content.match(/distDir\s*:\s*['"]([^'"]+)['"]/);
        if (/output\s*:\s*['"]export['"]/.test(content)) {
          return distDirMatch ? distDirMatch[1] : "out";
        }
        if (distDirMatch) {
          return distDirMatch[1];
        }
        return ".next";
      }
    } catch {
    }
  }
  return ".next";
}
async function hasBuildScript(shell) {
  try {
    const result = await shell.exec("cat", ["package.json"]);
    if (result.exit_code !== 0) return false;
    const pkg = JSON.parse(result.stdout);
    return !!(pkg.scripts && pkg.scripts.build);
  } catch {
    return false;
  }
}
function shellEscape(arg) {
  if (/^[a-zA-Z0-9._\-\/]+$/.test(arg)) return arg;
  return "'" + arg.replace(/'/g, "'\\''") + "'";
}
async function checkAutoDeployStatus(shell, siteId) {
  var _a, _b;
  try {
    const result = await netlifyApi(shell, "GET", `/sites/${siteId}`, void 0, { timeout: 15e3 });
    if (!result.ok) return null;
    const installationId = (_b = (_a = result.data) == null ? void 0 : _a.build_settings) == null ? void 0 : _b.installation_id;
    return !!installationId;
  } catch {
    return null;
  }
}
async function execNetlify(shell, args, options) {
  const escaped = args.map(shellEscape).join(" ");
  return shell.exec("sh", ["-c", `ulimit -n 8192 2>/dev/null; npx --yes netlify-cli ${escaped}`], options);
}
async function getNetlifyToken(shell) {
  try {
    const result = await shell.exec("sh", [
      "-c",
      `python3 -c "import json;d=json.load(open('$HOME/Library/Preferences/netlify/config.json'));print(d['users'][d['userId']]['auth']['token'])" 2>/dev/null`
    ]);
    if (result.exit_code === 0 && result.stdout.trim()) {
      return result.stdout.trim();
    }
  } catch {
  }
  return null;
}
async function netlifyApi(shell, method, path, body, options) {
  const token = await getNetlifyToken(shell);
  if (!token) throw new Error("Not authenticated");
  const bodyFlag = body ? `-d ${shellEscape(JSON.stringify(body))}` : "";
  const result = await shell.exec("sh", [
    "-c",
    `curl -s -w '\\nHTTP_STATUS:%{http_code}' -X ${method} 'https://api.netlify.com/api/v1${path}' -H 'Authorization: Bearer ${token}' -H 'Content-Type: application/json' ${bodyFlag}`
  ], options);
  const lines = result.stdout.trim().split("\n");
  const statusLine = lines.pop() || "";
  const statusMatch = statusLine.match(/HTTP_STATUS:(\d+)/);
  const status = statusMatch ? parseInt(statusMatch[1], 10) : 0;
  const responseBody = lines.join("\n");
  let data = null;
  try {
    data = JSON.parse(responseBody);
  } catch {
    data = responseBody;
  }
  return { ok: status >= 200 && status < 300, status, data };
}
function NetlifyIcon({ size = 14 }) {
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 150 150", fill: "currentColor", children: [
    /* @__PURE__ */ jsx("path", { d: "M43.91,116.64h-1.34l-6.67-6.67v-1.34l10.19-10.19h7.06l.94,.94v7.06l-10.19,10.19Z" }, "tl"),
    /* @__PURE__ */ jsx("path", { d: "M35.9,41.22v-1.34l6.67-6.67h1.34l10.19,10.19v7.06l-.94,.94h-7.06l-10.19-10.19Z" }, "tr"),
    /* @__PURE__ */ jsx("path", { d: "M94.6,95.14h-9.7l-.81-.81v-22.71c0-4.04-1.59-7.17-6.46-7.28-2.51-.07-5.38,0-8.44,.12l-.46,.47v29.39l-.81,.81h-9.7l-.81-.81V55.53l.81-.81h21.83c8.48,0,15.36,6.88,15.36,15.36v24.25l-.81,.81Z" }, "n"),
    /* @__PURE__ */ jsx("path", { d: "M45.29,80.6H6.49l-.81-.81v-9.72l.81-.81H45.29l.81,.81v9.72l-.81,.81Z" }, "l"),
    /* @__PURE__ */ jsx("path", { d: "M146.34,80.6h-38.8l-.81-.81v-9.72l.81-.81h38.8l.81,.81v9.72l-.81,.81Z" }, "r"),
    /* @__PURE__ */ jsx("path", { d: "M70.82,42.6V13.5l.81-.81h9.72l.81,.81v29.1l-.81,.81h-9.72l-.81-.81Z" }, "t"),
    /* @__PURE__ */ jsx("path", { d: "M70.82,136.36v-29.1l.81-.81h9.72l.81,.81v29.1l-.81,.81h-9.72l-.81-.81Z" }, "b")
  ] });
}
function ExternalLinkIcon({ size = 12 }) {
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
    /* @__PURE__ */ jsx("polyline", { points: "15 3 21 3 21 9" }),
    /* @__PURE__ */ jsx("line", { x1: "10", y1: "14", x2: "21", y2: "3" })
  ] });
}
function SwitchIcon() {
  return /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx("polyline", { points: "17 1 21 5 17 9" }),
    /* @__PURE__ */ jsx("path", { d: "M3 11V9a4 4 0 0 1 4-4h14" }),
    /* @__PURE__ */ jsx("polyline", { points: "7 23 3 19 7 15" }),
    /* @__PURE__ */ jsx("path", { d: "M21 13v2a4 4 0 0 1-4 4H3" })
  ] });
}
function DisconnectIcon() {
  return /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
  ] });
}
function DeployIcon() {
  return /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx("polyline", { points: "16 16 12 12 8 16" }),
    /* @__PURE__ */ jsx("line", { x1: "12", y1: "12", x2: "12", y2: "21" }),
    /* @__PURE__ */ jsx("path", { d: "M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" })
  ] });
}
function SignOutIcon() {
  return /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
    /* @__PURE__ */ jsx("polyline", { points: "16 17 21 12 16 7" }),
    /* @__PURE__ */ jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
  ] });
}
function ConnectModal({
  onClose,
  accounts,
  shell,
  storage,
  showToast,
  theme,
  onLinked
}) {
  var _a;
  const [tab, setTab] = useState("create");
  const [selectedAccountSlug, setSelectedAccountSlug] = useState(((_a = accounts[0]) == null ? void 0 : _a.slug) ?? "");
  const [siteName, setSiteName] = useState("");
  const [outputDir, setOutputDir] = useState("dist");
  const [detectingDir, setDetectingDir] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingSites, setExistingSites] = useState([]);
  const [loadingSites, setLoadingSites] = useState(false);
  const [selectedExisting, setSelectedExisting] = useState(null);
  useEffect(() => {
    let cancelled = false;
    detectOutputDir(shell).then((dir) => {
      if (!cancelled) {
        setOutputDir(dir);
        setDetectingDir(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [shell]);
  useEffect(() => {
    if (tab !== "link" || !selectedAccountSlug) return;
    let cancelled = false;
    setLoadingSites(true);
    setExistingSites([]);
    setSelectedExisting(null);
    netlifyApi(shell, "GET", `/${selectedAccountSlug}/sites`, void 0, { timeout: 3e4 }).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setExistingSites(parseSitesList(result.data));
      }
      setLoadingSites(false);
    }).catch(() => {
      if (!cancelled) setLoadingSites(false);
    });
    return () => {
      cancelled = true;
    };
  }, [tab, selectedAccountSlug]);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  const sanitizeSiteName = (name2) => {
    return name2.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  };
  const getSelectedAccount = () => {
    return accounts.find((a) => a.slug === selectedAccountSlug);
  };
  const handleCreate = useCallback(async () => {
    if (!selectedAccountSlug) {
      setError("Please select an account.");
      return;
    }
    const sanitized = sanitizeSiteName(siteName);
    setError(null);
    setLoading(true);
    try {
      const body = {};
      if (sanitized) body.name = sanitized;
      let createResponse = await netlifyApi(
        shell,
        "POST",
        `/${selectedAccountSlug}/sites`,
        body,
        { timeout: 3e4 }
      );
      if (!createResponse.ok && sanitized) {
        createResponse = await netlifyApi(
          shell,
          "POST",
          `/${selectedAccountSlug}/sites`,
          {},
          { timeout: 3e4 }
        );
      }
      if (!createResponse.ok) {
        const errData = createResponse.data;
        let msg = "Failed to create site.";
        if (errData == null ? void 0 : errData.errors) {
          const details = Object.entries(errData.errors).map(([k, v]) => `${k} ${v.join(", ")}`).join("; ");
          msg = details;
        }
        setError(msg);
        setLoading(false);
        return;
      }
      const siteData = createResponse.data;
      const siteId = (siteData == null ? void 0 : siteData.id) || "";
      const actualName = (siteData == null ? void 0 : siteData.name) || sanitized || "";
      const siteUrl = (siteData == null ? void 0 : siteData.ssl_url) || `https://${actualName}.netlify.app`;
      const adminUrl = (siteData == null ? void 0 : siteData.admin_url) || `https://app.netlify.com/sites/${actualName}`;
      if (siteId) {
        await shell.exec("sh", ["-c", `mkdir -p .netlify && echo '${JSON.stringify({ siteId })}' > .netlify/state.json`]);
      }
      const account = getSelectedAccount();
      const deployDir = outputDir.trim() || ".";
      const linked = {
        siteId,
        siteName: actualName,
        accountSlug: selectedAccountSlug,
        accountName: (account == null ? void 0 : account.name) ?? "",
        siteUrl,
        adminUrl,
        linkedAccount: selectedAccountSlug,
        outputDir: deployDir
      };
      await storage.write(linked);
      try {
        const canBuild = await hasBuildScript(shell);
        if (canBuild) {
          showToast("Building project...", "success");
          const buildResult = await shell.exec("npm", ["run", "build"], { timeout: 3e5 });
          if (buildResult.exit_code !== 0) {
            setError(`Build failed: ${buildResult.stderr || buildResult.stdout}`);
            setLoading(false);
            return;
          }
          if (deployDir !== ".") {
            const dirCheck = await shell.exec("test", ["-d", deployDir]);
            if (dirCheck.exit_code !== 0) {
              setError(`Build succeeded but "${deployDir}" folder was not created. Check your framework's output settings.`);
              setLoading(false);
              return;
            }
          }
        }
        showToast("Deploying to Netlify...", "success");
        const deployResult = await execNetlify(shell, [
          "deploy",
          "--dir",
          deployDir,
          "--prod",
          "--json"
        ], { timeout: 3e5 });
        if (deployResult.exit_code === 0) {
          try {
            const deployData = JSON.parse(deployResult.stdout);
            if (deployData.site_url) {
              linked.siteUrl = deployData.site_url;
              await storage.write(linked);
            }
          } catch {
          }
          showToast("Deployed to Netlify!", "success");
        } else {
          showToast('Site created but deploy failed. Try "Deploy Now" from the menu.', "error");
        }
      } catch {
        showToast("Site created! Deploy may still be running.", "success");
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
      setError("Please select a site.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const site = existingSites.find((s) => s.id === selectedExisting);
      if (!site) {
        setError("Selected site not found.");
        setLoading(false);
        return;
      }
      const linkResult = await shell.exec("sh", [
        "-c",
        `mkdir -p .netlify && echo '${JSON.stringify({ siteId: site.id })}' > .netlify/state.json`
      ]);
      if (linkResult.exit_code !== 0) {
        setError(`Failed to link: could not write .netlify/state.json`);
        setLoading(false);
        return;
      }
      const account = getSelectedAccount();
      const linked = {
        siteId: site.id,
        siteName: site.name,
        accountSlug: selectedAccountSlug,
        accountName: (account == null ? void 0 : account.name) ?? "",
        siteUrl: site.ssl_url || site.url,
        adminUrl: site.admin_url || `https://app.netlify.com/sites/${site.id}`,
        linkedAccount: selectedAccountSlug,
        outputDir
      };
      await storage.write(linked);
      showToast(`Linked to ${site.name}`, "success");
      onLinked(linked);
      onClose();
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, [selectedExisting, selectedAccountSlug, outputDir, existingSites, shell, storage, showToast, onLinked, onClose]);
  const selectedAccount = getSelectedAccount();
  return /* @__PURE__ */ jsx("div", { className: "nf-modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "nf-modal",
      style: { background: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` },
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "nf-modal-header", style: { borderBottom: `1px solid ${theme.border}` }, children: [
          /* @__PURE__ */ jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ jsx(NetlifyIcon, { size: 14 }),
            "Connect Netlify Site"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "nf-close-btn",
              onClick: onClose,
              style: { color: theme.textMuted },
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "nf-modal-body", children: [
          error && /* @__PURE__ */ jsx("div", { className: "nf-error-box", children: error }),
          /* @__PURE__ */ jsxs("div", { className: "nf-tabs", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `nf-tab ${tab === "create" ? "nf-tab-active" : ""}`,
                onClick: () => {
                  setTab("create");
                  setError(null);
                },
                children: "Create New"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `nf-tab ${tab === "link" ? "nf-tab-active" : ""}`,
                onClick: () => {
                  setTab("link");
                  setError(null);
                },
                children: "Link Existing"
              }
            )
          ] }),
          accounts.length > 1 && /* @__PURE__ */ jsxs("div", { className: "nf-form-group", children: [
            /* @__PURE__ */ jsx("label", { className: "nf-form-label", children: "Account" }),
            /* @__PURE__ */ jsxs("div", { className: "nf-custom-select", style: { borderColor: theme.border }, children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "nf-custom-select-trigger",
                  onClick: () => {
                    const el = document.getElementById("nf-account-dropdown");
                    if (el) el.style.display = el.style.display === "block" ? "none" : "block";
                  },
                  type: "button",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: selectedAccount ? selectedAccount.name : "Select account" }),
                    /* @__PURE__ */ jsx("span", { style: { opacity: 0.4, fontSize: 10 }, children: "▼" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { id: "nf-account-dropdown", className: "nf-custom-select-options", style: { display: "none", background: theme.bgPrimary, borderColor: theme.border }, children: accounts.map((a) => /* @__PURE__ */ jsx(
                "button",
                {
                  className: `nf-custom-select-option ${selectedAccountSlug === a.slug ? "nf-option-selected" : ""}`,
                  onClick: () => {
                    setSelectedAccountSlug(a.slug);
                    const el = document.getElementById("nf-account-dropdown");
                    if (el) el.style.display = "none";
                  },
                  type: "button",
                  children: a.name
                },
                a.id
              )) })
            ] })
          ] }),
          tab === "create" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "nf-form-group", children: [
              /* @__PURE__ */ jsx("label", { className: "nf-form-label", children: "Site Name (optional)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "nf-form-input",
                  style: { borderColor: theme.border },
                  type: "text",
                  placeholder: "leave blank to auto-generate",
                  value: siteName,
                  onChange: (e) => setSiteName(e.target.value),
                  autoCorrect: "off",
                  autoCapitalize: "off",
                  spellCheck: false
                }
              ),
              siteName && sanitizeSiteName(siteName) !== siteName && /* @__PURE__ */ jsxs("div", { className: "nf-form-hint", children: [
                "Will be created as: ",
                sanitizeSiteName(siteName)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "nf-form-group", children: [
              /* @__PURE__ */ jsx("label", { className: "nf-form-label", children: "Output Directory" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "nf-form-input",
                  style: { borderColor: theme.border },
                  type: "text",
                  value: outputDir,
                  onChange: (e) => setOutputDir(e.target.value),
                  autoCorrect: "off",
                  autoCapitalize: "off",
                  spellCheck: false
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "nf-form-hint", children: detectingDir ? "Detecting..." : "The folder your build tool outputs to (e.g. dist, build, out)" })
            ] })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "nf-form-group", children: [
              /* @__PURE__ */ jsx("label", { className: "nf-form-label", children: "Select Site" }),
              loadingSites ? /* @__PURE__ */ jsxs("div", { style: { padding: "8px 0", fontSize: 12, opacity: 0.5 }, children: [
                /* @__PURE__ */ jsx("span", { className: "nf-spinner" }),
                " Loading sites..."
              ] }) : existingSites.length === 0 ? /* @__PURE__ */ jsx("div", { style: { padding: "8px 0", fontSize: 12, opacity: 0.5 }, children: "No sites found. Create one in the other tab." }) : /* @__PURE__ */ jsx("div", { className: "nf-site-list", style: { borderColor: theme.border }, children: existingSites.map((s) => /* @__PURE__ */ jsxs(
                "button",
                {
                  className: `nf-site-item ${selectedExisting === s.id ? "nf-site-selected" : ""}`,
                  onClick: () => setSelectedExisting(s.id),
                  children: [
                    /* @__PURE__ */ jsx("span", { children: s.custom_domain || s.name }),
                    /* @__PURE__ */ jsx("span", { className: "nf-site-subdomain", children: s.custom_domain ? s.ssl_url || s.url : "" })
                  ]
                },
                s.id
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "nf-form-group", children: [
              /* @__PURE__ */ jsx("label", { className: "nf-form-label", children: "Output Directory" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "nf-form-input",
                  style: { borderColor: theme.border },
                  type: "text",
                  value: outputDir,
                  onChange: (e) => setOutputDir(e.target.value),
                  autoCorrect: "off",
                  autoCapitalize: "off",
                  spellCheck: false
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "nf-form-hint", children: detectingDir ? "Detecting..." : "The folder your build tool outputs to (e.g. dist, build, out)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "nf-modal-footer", style: { borderTop: `1px solid ${theme.border}` }, children: tab === "create" ? /* @__PURE__ */ jsx(
          "button",
          {
            className: "nf-btn nf-btn-primary",
            onClick: handleCreate,
            disabled: loading,
            children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "nf-spinner" }),
              " Deploying..."
            ] }) : "Connect & Deploy"
          }
        ) : /* @__PURE__ */ jsx(
          "button",
          {
            className: "nf-btn nf-btn-primary",
            onClick: handleLink,
            disabled: loading || !selectedExisting,
            children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "nf-spinner" }),
              " Linking..."
            ] }) : "Link Site"
          }
        ) })
      ]
    }
  ) });
}
function ConnectedDropdown({
  linked,
  currentBranch,
  actions,
  onUnlink,
  onSignOut,
  onDeploy,
  isDeploying,
  autoDeployLinked,
  onSetupAutoDeploy
}) {
  const prodUrl = linked.siteUrl || `https://${linked.siteName}.netlify.app`;
  const prodLabel = prodUrl.replace("https://", "");
  const dashboardUrl = linked.adminUrl || `https://app.netlify.com/sites/${linked.siteName}`;
  const branchPreviewUrl = currentBranch && currentBranch !== "main" && currentBranch !== "master" ? `https://${currentBranch}--${linked.siteName}.netlify.app` : null;
  return /* @__PURE__ */ jsx("div", { className: "nf-dropdown", children: /* @__PURE__ */ jsxs("div", { className: "nf-dropdown-inner", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          actions.openUrl(prodUrl);
        },
        children: [
          /* @__PURE__ */ jsx("span", { className: "nf-badge nf-badge-prod", children: "Prod" }),
          /* @__PURE__ */ jsx("span", { className: "nf-site-url", children: prodLabel }),
          /* @__PURE__ */ jsx(ExternalLinkIcon, {})
        ]
      }
    ),
    branchPreviewUrl && /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          actions.openUrl(branchPreviewUrl);
        },
        children: [
          /* @__PURE__ */ jsx("span", { className: "nf-badge nf-badge-preview", children: "Branch" }),
          /* @__PURE__ */ jsxs("span", { className: "nf-site-url", children: [
            currentBranch,
            "--",
            linked.siteName,
            ".netlify.app"
          ] }),
          /* @__PURE__ */ jsx(ExternalLinkIcon, {})
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          actions.openUrl(dashboardUrl);
        },
        children: [
          /* @__PURE__ */ jsx("span", { className: "nf-badge nf-badge-dashboard", children: "Dash" }),
          /* @__PURE__ */ jsx("span", { className: "nf-site-url", children: "app.netlify.com" }),
          /* @__PURE__ */ jsx(ExternalLinkIcon, {})
        ]
      }
    ),
    autoDeployLinked === true && /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          actions.openUrl(`${dashboardUrl}/configuration/deploys`);
        },
        children: [
          /* @__PURE__ */ jsx("span", { className: "nf-badge nf-badge-ci", children: "CI/CD" }),
          /* @__PURE__ */ jsxs("span", { className: "nf-site-url", children: [
            "Auto-deploy from ",
            currentBranch || "main"
          ] }),
          /* @__PURE__ */ jsx(ExternalLinkIcon, {})
        ]
      }
    ),
    autoDeployLinked === false && /* @__PURE__ */ jsxs(
      "button",
      {
        className: "nf-dropdown-action",
        onClick: (e) => {
          e.stopPropagation();
          onSetupAutoDeploy();
        },
        children: [
          /* @__PURE__ */ jsx(DeployIcon, {}),
          "Set up auto-deploy"
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "nf-dropdown-divider" }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "nf-dropdown-action",
        onClick: (e) => {
          e.stopPropagation();
          onDeploy();
        },
        disabled: isDeploying,
        children: [
          /* @__PURE__ */ jsx(DeployIcon, {}),
          isDeploying ? "Deploying..." : "Deploy Now"
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "nf-dropdown-divider" }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "nf-dropdown-action nf-action-danger",
        onClick: (e) => {
          e.stopPropagation();
          onUnlink();
        },
        children: [
          /* @__PURE__ */ jsx(DisconnectIcon, {}),
          "Disconnect Project"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "nf-dropdown-action nf-action-danger",
        onClick: (e) => {
          e.stopPropagation();
          onSignOut();
        },
        children: [
          /* @__PURE__ */ jsx(SignOutIcon, {}),
          "Sign Out"
        ]
      }
    )
  ] }) });
}
function NetlifyToolbar() {
  var _a;
  const ctx = usePluginContext();
  const shell = ctx.shell;
  const storage = ctx.storage;
  const showToast = ctx.actions.showToast;
  const theme = ctx.theme;
  const actions = ctx.actions;
  useInjectStyles();
  const shellRef = useRef(shell);
  shellRef.current = shell;
  const storageRef = useRef(storage);
  storageRef.current = storage;
  const [cliStatus, setCliStatus] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [linked, setLinked] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [hasGitRemote, setHasGitRemote] = useState(false);
  const [autoDeployLinked, setAutoDeployLinked] = useState(null);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const state = (() => {
    if (cliStatus === null) return "CHECKING";
    if (!cliStatus.installed) return "NOT_INSTALLED";
    if (!cliStatus.authenticated) return "NOT_AUTHENTICATED";
    if (linked && accounts.length > 0 && !accounts.some((a) => a.slug === linked.linkedAccount)) return "WRONG_ACCOUNT";
    if (isDeploying) return "DEPLOYING";
    if (linked) return "CONNECTED";
    return "NOT_LINKED";
  })();
  useEffect(() => {
    let cancelled = false;
    async function check() {
      const sh = shellRef.current;
      const st = storageRef.current;
      try {
        const versionResult = await execNetlify(sh, ["--version"], { timeout: 3e4 });
        if (cancelled) return;
        if (versionResult.exit_code !== 0) {
          setCliStatus({ installed: false, authenticated: false });
          return;
        }
        const accountsResult = await execNetlify(sh, [
          "api",
          "listAccountsForUser",
          "--data",
          "{}"
        ], { timeout: 3e4 });
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
        try {
          const data = await st.read();
          if (data.siteId && data.siteName) {
            setLinked(data);
            const status = await checkAutoDeployStatus(sh, data.siteId);
            if (!cancelled) setAutoDeployLinked(status);
          }
        } catch {
        }
      } catch {
        if (!cancelled) {
          setCliStatus({ installed: false, authenticated: false });
        }
      }
    }
    check();
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    let cancelled = false;
    let timer = null;
    async function poll() {
      try {
        const result = await shellRef.current.exec("git", ["remote", "-v"], { timeout: 5e3 });
        if (cancelled) return;
        const found = result.exit_code === 0 && result.stdout.trim().length > 0;
        setHasGitRemote(found);
        if (!found) {
          timer = setTimeout(poll, 3e3);
        }
      } catch {
        if (!cancelled) {
          setHasGitRemote(false);
          timer = setTimeout(poll, 3e3);
        }
      }
    }
    poll();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    if (!showDropdown) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showDropdown]);
  const handleInstall = useCallback(async () => {
    setInstalling(true);
    showToast("Installing Netlify CLI (this may take a moment)...", "success");
    try {
      const result = await execNetlify(shell, ["--version"], { timeout: 12e4 });
      if (result.exit_code === 0) {
        showToast("Netlify CLI installed!", "success");
        setCliStatus({ installed: true, authenticated: false });
      } else {
        showToast(`Install failed: ${result.stderr}`, "error");
      }
    } catch (err) {
      showToast(`Install failed: ${err instanceof Error ? err.message : String(err)}`, "error");
    } finally {
      setInstalling(false);
    }
  }, [shell, showToast]);
  const handleLogin = useCallback(async () => {
    showToast("Opening Netlify login...", "success");
    try {
      const result = await execNetlify(shell, ["login"], { timeout: 12e4 });
      if (result.exit_code === 0) {
        const accountsResult = await execNetlify(shell, [
          "api",
          "listAccountsForUser",
          "--data",
          "{}"
        ], { timeout: 15e3 });
        const parsedAccounts = accountsResult.exit_code === 0 ? parseAccounts(accountsResult.stdout) : [];
        setAccounts(parsedAccounts);
        if (parsedAccounts.length > 0) {
          setCliStatus({ installed: true, authenticated: true });
          showToast("Connected to Netlify!", "success");
        } else {
          setCliStatus({ installed: true, authenticated: false });
          showToast("Authentication failed. Please try again.", "error");
        }
      } else {
        showToast("Login failed or was cancelled.", "error");
      }
    } catch {
      showToast("Login timed out or failed.", "error");
    }
  }, [shell, showToast]);
  const handleDeploy = useCallback(async () => {
    if (!linked) return;
    setIsDeploying(true);
    setShowDropdown(false);
    try {
      const deployDir = linked.outputDir || ".";
      const canBuild = await hasBuildScript(shell);
      if (canBuild) {
        showToast("Building project...", "success");
        const buildResult = await shell.exec("npm", ["run", "build"], { timeout: 3e5 });
        if (buildResult.exit_code !== 0) {
          showToast(`Build failed: ${buildResult.stderr || buildResult.stdout}`, "error");
          setIsDeploying(false);
          return;
        }
        if (deployDir !== ".") {
          const dirCheck = await shell.exec("test", ["-d", deployDir]);
          if (dirCheck.exit_code !== 0) {
            showToast(`Build succeeded but "${deployDir}" folder not found. Check your framework's output settings.`, "error");
            setIsDeploying(false);
            return;
          }
        }
      }
      showToast("Deploying to Netlify...", "success");
      const result = await execNetlify(shell, [
        "deploy",
        "--dir",
        deployDir,
        "--prod",
        "--json"
      ], { timeout: 3e5 });
      if (result.exit_code === 0) {
        try {
          const deployData = JSON.parse(result.stdout);
          if (deployData.site_url && deployData.site_url !== linked.siteUrl) {
            const updated = { ...linked, siteUrl: deployData.site_url };
            setLinked(updated);
            await storage.write(updated);
          }
        } catch {
        }
        showToast("Deployed to Netlify!", "success");
      } else {
        showToast(`Deploy failed: ${result.stderr}`, "error");
      }
    } catch {
      showToast("Deploy may still be running.", "success");
    } finally {
      setIsDeploying(false);
    }
  }, [linked, shell, showToast, storage]);
  const handleUnlink = useCallback(async () => {
    try {
      await shell.exec("rm", ["-f", ".netlify/state.json"]);
      await storage.write({});
      setLinked(null);
      setShowDropdown(false);
      showToast("Disconnected from Netlify.", "success");
    } catch {
      showToast("Failed to disconnect.", "error");
    }
  }, [shell, storage, showToast]);
  const handleSignOut = useCallback(async () => {
    setShowDropdown(false);
    try {
      await execNetlify(shell, ["logout"], { timeout: 3e4 });
      await storage.write({});
      setLinked(null);
      setAccounts([]);
      setCliStatus({ installed: true, authenticated: false });
      showToast("Signed out of Netlify.", "success");
    } catch {
      showToast("Failed to sign out.", "error");
    }
  }, [shell, storage, showToast]);
  const handleLinked = useCallback((site) => {
    setLinked(site);
    setAutoDeployLinked(null);
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
  const currentBranch = ((_a = ctx.project) == null ? void 0 : _a.currentBranch) ?? null;
  if (!hasGitRemote && state !== "CONNECTED") return null;
  switch (state) {
    case "CHECKING":
      return /* @__PURE__ */ jsxs(
        "button",
        {
          className: "toolbar-icon-btn nf-checking",
          disabled: true,
          title: "Connecting to Netlify...",
          children: [
            /* @__PURE__ */ jsx(NetlifyIcon, {}),
            /* @__PURE__ */ jsx("span", { className: "nf-checking-text", children: "Connecting..." })
          ]
        }
      );
    case "NOT_INSTALLED":
      return /* @__PURE__ */ jsxs(
        "button",
        {
          className: `toolbar-icon-btn${installing ? " nf-checking" : ""}`,
          onClick: handleInstall,
          disabled: installing,
          title: "Install Netlify CLI",
          children: [
            /* @__PURE__ */ jsx(NetlifyIcon, {}),
            installing ? "Installing..." : "Install Netlify CLI"
          ]
        }
      );
    case "NOT_AUTHENTICATED":
      return /* @__PURE__ */ jsxs(
        "button",
        {
          className: "toolbar-icon-btn",
          onClick: handleLogin,
          title: "Connect your Netlify account",
          children: [
            /* @__PURE__ */ jsx(NetlifyIcon, {}),
            "Connect Netlify"
          ]
        }
      );
    case "WRONG_ACCOUNT":
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "nf-dropdown-wrapper",
          ref: dropdownRef,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "toolbar-icon-btn",
                onClick: () => setShowDropdown((v) => !v),
                title: "Account mismatch",
                style: { color: "#f59e0b" },
                children: /* @__PURE__ */ jsx(NetlifyIcon, {})
              }
            ),
            showDropdown && /* @__PURE__ */ jsx("div", { className: "nf-dropdown", children: /* @__PURE__ */ jsxs("div", { className: "nf-dropdown-inner", children: [
              /* @__PURE__ */ jsxs("div", { className: "nf-mismatch-text", children: [
                "This site is linked to ",
                /* @__PURE__ */ jsx("strong", { children: (linked == null ? void 0 : linked.accountName) || "a different account" }),
                " but you're signed in to a different account."
              ] }),
              /* @__PURE__ */ jsx("div", { className: "nf-dropdown-divider" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "nf-dropdown-action",
                  onClick: (e) => {
                    e.stopPropagation();
                    handleLogin();
                  },
                  children: [
                    /* @__PURE__ */ jsx(SwitchIcon, {}),
                    "Switch Account"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "nf-dropdown-action nf-action-danger",
                  onClick: (e) => {
                    e.stopPropagation();
                    handleUnlink();
                  },
                  children: [
                    /* @__PURE__ */ jsx(DisconnectIcon, {}),
                    "Disconnect Project"
                  ]
                }
              )
            ] }) })
          ]
        }
      );
    case "NOT_LINKED":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "toolbar-icon-btn",
            onClick: () => setShowModal(true),
            title: "Link a Netlify site",
            children: [
              /* @__PURE__ */ jsx(NetlifyIcon, {}),
              "Link Site"
            ]
          }
        ),
        showModal && /* @__PURE__ */ jsx(
          ConnectModal,
          {
            onClose: () => setShowModal(false),
            accounts,
            shell,
            storage,
            showToast,
            theme,
            onLinked: handleLinked
          }
        )
      ] });
    case "DEPLOYING":
      return /* @__PURE__ */ jsxs(
        "button",
        {
          className: "toolbar-icon-btn nf-deploying",
          disabled: true,
          title: "Deploying to Netlify...",
          children: [
            /* @__PURE__ */ jsx(NetlifyIcon, {}),
            /* @__PURE__ */ jsx("span", { className: "nf-deploying-text", children: "Deploying..." })
          ]
        }
      );
    case "CONNECTED":
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "nf-dropdown-wrapper",
          ref: dropdownRef,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: () => !isDeploying && handleMouseLeave(),
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "toolbar-icon-btn",
                onClick: () => actions.openUrl(linked.adminUrl || `https://app.netlify.com/sites/${linked.siteName}`),
                title: `${linked.siteName} — Netlify`,
                children: /* @__PURE__ */ jsx(NetlifyIcon, {})
              }
            ),
            showDropdown && /* @__PURE__ */ jsx(
              ConnectedDropdown,
              {
                linked,
                currentBranch,
                actions,
                onUnlink: handleUnlink,
                onSignOut: handleSignOut,
                onDeploy: handleDeploy,
                isDeploying,
                autoDeployLinked,
                onSetupAutoDeploy: () => actions.openUrl(`https://app.netlify.com/sites/${linked.siteName}/configuration/deploys`)
              }
            )
          ]
        }
      );
  }
}
const name = "Netlify";
const slots = {
  toolbar: NetlifyToolbar
};
function onActivate() {
  console.log("[netlify] Plugin activated");
}
function onDeactivate() {
  console.log("[netlify] Plugin deactivated");
  const styleEl = document.getElementById(NF_STYLE_ID);
  if (styleEl) styleEl.remove();
}
export {
  name,
  onActivate,
  onDeactivate,
  slots
};
