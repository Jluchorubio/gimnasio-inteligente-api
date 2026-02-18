import { apiRequest } from './config.js';

export async function getUsuarios() {
  return apiRequest('/api/usuarios');
}

export async function getRutinasByUsuario(idUsuario) {
  return apiRequest(`/api/usuarios/${idUsuario}/rutinas`);
}
