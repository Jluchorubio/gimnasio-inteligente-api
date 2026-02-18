import { getEntrenadores } from '../api/entrenador.api.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function setCurrentYear() {
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
}

function renderEntrenadores(entrenadores) {
  const container = document.getElementById('entrenadores-cards');
  container.innerHTML = '';

  if (!entrenadores.length) {
    container.textContent = 'No hay entrenadores disponibles.';
    return;
  }

  container.innerHTML = entrenadores
    .map(
      (entrenador) => `
        <article>
          <h2>${entrenador.nombre ?? 'Sin nombre'}</h2>
          <p>Especialidad: ${entrenador.especialidad ?? 'No especificada'}</p>
          <p>Email: ${entrenador.email ?? 'No disponible'}</p>
          <p>ID: ${entrenador.id_entrenador ?? '-'}</p>
        </article>
      `
    )
    .join('');
}

async function loadEntrenadores() {
  const feedback = document.getElementById('entrenadores-feedback');

  try {
    feedback.textContent = 'Cargando entrenadores...';
    const entrenadores = normalizeArray(await getEntrenadores());
    renderEntrenadores(entrenadores);
    feedback.textContent = `Entrenadores cargados: ${entrenadores.length}`;
  } catch (error) {
    feedback.textContent = `Error al cargar entrenadores: ${error.message}`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  setCurrentYear();
  await loadEntrenadores();
});
