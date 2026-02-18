import { apiRequest } from './config.js';

export async function getRutinas() {
  return apiRequest('/api/rutinas');
}

export async function getEjerciciosByRutina(idRutina) {
  return apiRequest(`/api/rutinas/${idRutina}/ejercicios`);
}
