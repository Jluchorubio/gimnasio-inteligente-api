import { getEntrenadores } from './api/entrenador.api.js';
import { setupUI } from './ui.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

async function renderFeaturedTrainers() {
  const container = document.getElementById('featured-trainers-list');
  if (!container) return;

  container.textContent = 'Cargando entrenadores...';

  try {
    const trainers = normalizeArray(await getEntrenadores());
    const destacados = trainers.slice(0, 4);

    if (!destacados.length) {
      container.textContent = 'No hay entrenadores destacados para mostrar.';
      return;
    }

    container.innerHTML = destacados
      .map(
        (trainer) => `
          <article class="trainer-card reveal">
            <div class="content">
              <h3>${trainer.nombre ?? 'Sin nombre'}</h3>
              <p>Especialidad: ${trainer.especialidad ?? 'No especificada'}</p>
              <p>Email: ${trainer.email ?? 'No disponible'}</p>
            </div>
          </article>
        `
      )
      .join('');
  } catch (error) {
    container.textContent = `No se pudieron cargar entrenadores: ${error.message}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupUI();
  renderFeaturedTrainers();
});
