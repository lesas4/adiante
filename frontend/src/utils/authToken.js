// Utilities to read auth token from cookie (preferred) with localStorage fallback
export function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export function getAuthToken() {
  // Prefer cookie (for httpOnly cookie migration)
  const fromCookie = getCookie('auth_token');
  if (fromCookie) return fromCookie;

  // Fallback to localStorage for backwards compatibility
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth_token') || localStorage.getItem('token');
    }
  } catch (e) {
      // Silently continue on error
    return null;
  }

  return null;
}

export function getAuthHeader() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
