// Base URL configurable. Si no se define manualmente, usa el mismo dominio donde corre el frontend.
export const API_BASE_URL = window.GIMNASIO_API_BASE_URL || window.location.origin;

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const method = (options.method || 'GET').toUpperCase();
  const customHeaders = options.headers || {};

  // Evita preflight innecesario en GET/HEAD al no forzar Content-Type.
  const headers = {
    ...(method !== 'GET' && method !== 'HEAD' ? { 'Content-Type': 'application/json' } : {}),
    ...customHeaders
  };

  try {
    const response = await fetch(url, {
      ...options,
      method,
      headers
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const message = data?.message || `Error HTTP ${response.status}`;
      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.error(`Error en ${url}:`, error.message);
    throw error;
  }
}
