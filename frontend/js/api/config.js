// Base URL configurable.
// 1) Si existe window.GIMNASIO_API_BASE_URL, se usa ese valor.
// 2) Si el frontend corre en el dominio del proyecto en Render, usa window.location.origin.
// 3) En local u otros hosts, usa Render como respaldo.
const RENDER_API_URL = 'https://gimnasio-inteligente-api.onrender.com';
const isProjectRenderHost = window.location.hostname.includes('gimnasio-inteligente-api');

export const API_BASE_URL = window.GIMNASIO_API_BASE_URL || (isProjectRenderHost ? window.location.origin : RENDER_API_URL);

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
