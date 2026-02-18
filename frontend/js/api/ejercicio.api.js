import { apiRequest } from './config.js';

export async function getEjercicios() {
  return apiRequest('/api/ejercicios');
}

