import { apiRequest } from './config.js';

export async function getProgresos() {
  return apiRequest('/api/progresos');
}

export async function getProgresoMensualByUsuario(idUsuario) {
  return apiRequest(`/api/usuarios/${idUsuario}/progreso-mensual`);
}
