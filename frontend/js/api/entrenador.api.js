import { apiRequest } from './config.js';

export async function getEntrenadores() {
  return apiRequest('/api/entrenadores');
}
