import { getEntrenadores } from '../api/entrenador.api.js';
import { setupUI } from '../ui.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function renderEntrenadores(entrenadores) {
  const container = document.getElementById('entrenadores-cards');
  if (!container) return;

  container.innerHTML = '';

  if (!entrenadores.length) {
    container.textContent = 'No hay entrenadores disponibles.';
    return;
  }

  container.innerHTML = entrenadores
    .map(
      (entrenador) => `
        <article class="bg-zinc-900 p-6 rounded-lg border-l-4 border-orange-accent card-lift reveal">
          <h2 class="text-2xl font-bold mb-2 text-orange-accent">${entrenador.nombre ?? 'Sin nombre'}</h2>
          <p class="text-gray-300">Especialidad: ${entrenador.especialidad ?? 'No especificada'}</p>
          <p class="text-gray-400 text-sm mt-1">Email: ${entrenador.email ?? 'No disponible'}</p>
          <p class="text-gray-500 text-xs mt-3">ID: ${entrenador.id_entrenador ?? '-'}</p>
        </article>
      `
    )
    .join('');
}

async function loadEntrenadores() {
  const feedback = document.getElementById('entrenadores-feedback');
  if (feedback) feedback.textContent = 'Cargando entrenadores...';

  try {
    const entrenadores = normalizeArray(await getEntrenadores());
    renderEntrenadores(entrenadores);
    if (feedback) feedback.textContent = `Entrenadores cargados: ${entrenadores.length}`;
  } catch (error) {
    if (feedback) feedback.textContent = `Error al cargar entrenadores: ${error.message}`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  setupUI();
  await loadEntrenadores();
});
