import { getEjercicios } from '../api/ejercicio.api.js';
import { setupUI } from '../ui.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function renderEjercicios(ejercicios) {
  const container = document.getElementById('ejercicios-cards');
  if (!container) return;

  container.innerHTML = '';

  if (!ejercicios.length) {
    container.textContent = 'No hay ejercicios disponibles.';
    return;
  }

  container.innerHTML = ejercicios
    .map(
      (ejercicio) => `
        <article class="bg-zinc-900 p-6 rounded-lg border-l-4 border-orange-accent card-lift reveal">
          <h2 class="text-xl font-bold mb-3 text-orange-accent">${ejercicio.nombre ?? 'Ejercicio sin nombre'}</h2>
          <p class="text-gray-300 mb-2">${ejercicio.descripcion ?? 'Sin descripcion'}</p>
          <p class="text-gray-400 text-sm">Grupo muscular: ${ejercicio.grupo_muscular ?? '-'}</p>
          <p class="text-gray-400 text-sm">Tipo: ${ejercicio.tipo ?? '-'}</p>
          <p class="text-gray-500 text-xs mt-3">ID: ${ejercicio.id_ejercicio ?? '-'}</p>
        </article>
      `
    )
    .join('');
}

async function loadEjercicios() {
  const feedback = document.getElementById('ejercicios-feedback');
  if (feedback) feedback.textContent = 'Cargando ejercicios...';

  try {
    const ejercicios = normalizeArray(await getEjercicios());
    renderEjercicios(ejercicios);
    if (feedback) feedback.textContent = `Ejercicios cargados: ${ejercicios.length}`;
  } catch (error) {
    if (feedback) feedback.textContent = `Error al cargar ejercicios: ${error.message}`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  setupUI();
  await loadEjercicios();
});
