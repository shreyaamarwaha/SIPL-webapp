// Shared backend API configuration.
//
// In local dev, Vite's proxy (see vite.config.js) forwards "/api/*" to
// http://localhost:8001, stripping the "/api" prefix. That proxy ONLY exists
// during `npm run dev` — a production build (`vite build`) is just static
// files with no server-side proxy capability, so it has no way to know
// where the real backend lives unless we tell it explicitly.
//
// Set VITE_API_BASE_URL in your deployment platform's environment variables
// (e.g. Render, Vercel, Netlify — wherever this frontend gets deployed) to
// the real backend URL, e.g.:
//   VITE_API_BASE_URL=https://depression-screening-webapp.onrender.com
//
// Locally, leave it unset — requests will fall back to relative paths,
// which the dev proxy above already handles correctly.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Builds a full request URL.
//
// - In production (VITE_API_BASE_URL set): strips the leading "/api" prefix
//   and prepends the real backend URL — the actual backend's routes never
//   had "/api" in them (e.g. /scid/questions, not /api/scid/questions), and
//   there's no proxy in a production static build to do this rewriting for us.
// - In local dev (VITE_API_BASE_URL unset): returns the path UNCHANGED,
//   "/api" prefix and all. Vite's dev server proxy (vite.config.js) only
//   intercepts requests that literally start with "/api" — it does its own
//   rewrite (stripping "/api") when forwarding to localhost:8001. Stripping
//   the prefix here, client-side, before the request is even made would
//   stop it from matching the proxy's trigger pattern at all, breaking
//   local dev. Caught via a direct before/after test, not assumed.
export function apiUrl(path) {
  if (!API_BASE_URL) {
    return path;
  }
  const cleanPath = path.replace(/^\/api/, "");
  return `${API_BASE_URL}${cleanPath}`;
}
