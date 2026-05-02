// Dev: Vite proxy serves /api -> backend. Production (e.g. Vercel): set VITE_API_URL in the build
// to your API host (with or without trailing /api). Example: https://my-api.onrender.com
function apiBase() {
  const v = import.meta.env.VITE_API_URL;
  if (!v) return '/api';
  const base = String(v).replace(/\/$/, '');
  if (base.endsWith('/api')) return base;
  return `${base}/api`;
}

export const API_BASE = apiBase();
