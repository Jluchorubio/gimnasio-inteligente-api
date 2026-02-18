import { getEntrenadores } from './api/entrenador.api.js';

function setCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}

function markActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

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
    const destacados = trainers.slice(0, 3);

    if (!destacados.length) {
      container.textContent = 'No hay entrenadores destacados para mostrar.';
      return;
    }

    container.innerHTML = destacados
      .map(
        (trainer) => `
          <article>
            <h3>${trainer.nombre ?? 'Sin nombre'}</h3>
            <p>Especialidad: ${trainer.especialidad ?? 'No especificada'}</p>
            <p>Email: ${trainer.email ?? 'No disponible'}</p>
          </article>
        `
      )
      .join('');
  } catch (error) {
    container.textContent = `No se pudieron cargar entrenadores: ${error.message}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setCurrentYear();
  markActiveLink();
  renderFeaturedTrainers();
});
