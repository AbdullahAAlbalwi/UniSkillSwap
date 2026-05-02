const STORAGE_KEY = 'uniskillswap_token';

export function getApiBase() {
  const base = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  return base.replace(/\/$/, '');
}

export function getToken() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  if (token) localStorage.setItem(STORAGE_KEY, token);
  else localStorage.removeItem(STORAGE_KEY);
}

export async function api(path, { method = 'GET', body, auth = false } = {}) {
  const url = `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'omit',
  });
  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text || 'Invalid response' };
    }
  }
  if (!res.ok) {
    const err = new Error(data?.error || res.statusText || 'Request failed');
    err.status = res.status;
    err.details = data?.details;
    err.body = data;
    throw err;
  }
  return data;
}
