/**
 * Parse JSON from a fetch Response. Fails with a clear message if the body is HTML
 * (e.g. Vercel 404) or not JSON.
 */
export async function readApiJson(res) {
  const text = await res.text();
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('Empty response from server.');
  }
  if (trimmed.startsWith('<') || trimmed.startsWith('<!')) {
    throw new Error(
      'The app received a web page instead of API data. On Vercel, set the environment variable VITE_API_URL to your deployed backend base URL (e.g. https://your-api.onrender.com) and redeploy, and allow that origin in the backend CORS settings.'
    );
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Invalid JSON';
    throw new Error(
      msg.includes('JSON') || msg.includes('token')
        ? 'API returned non-JSON. Check VITE_API_URL and that the backend is running.'
        : msg
    );
  }
}
