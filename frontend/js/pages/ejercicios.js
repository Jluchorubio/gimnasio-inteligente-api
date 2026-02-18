import { getEjercicios } from '../api/ejercicio.api.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function setCurrentYear() {
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
}

function renderEjercicios(ejercicios) {
  const container = document.getElementById('ejercicios-cards');
  container.innerHTML = '';

  if (!ejercicios.length) {
    container.textContent = 'No hay ejercicios disponibles.';
    return;
  }

  container.innerHTML = ejercicios
    .map(
      (ejercicio) => `
        <article>
          <h2>${ejercicio.nombre ?? 'Ejercicio sin nombre'}</h2>
          <p>Descripcion: ${ejercicio.descripcion ?? 'Sin descripcion'}</p>
          <p>Grupo muscular: ${ejercicio.grupo_muscular ?? '-'}</p>
          <p>Tipo: ${ejercicio.tipo ?? '-'}</p>
          <p>ID: ${ejercicio.id_ejercicio ?? '-'}</p>
        </article>
      `
    )
    .join('');
}

async function loadEjercicios() {
  const feedback = document.getElementById('ejercicios-feedback');

  try {
    feedback.textContent = 'Cargando ejercicios...';
    const ejercicios = normalizeArray(await getEjercicios());
    renderEjercicios(ejercicios);
    feedback.textContent = `Ejercicios cargados: ${ejercicios.length}`;
  } catch (error) {
    feedback.textContent = `Error al cargar ejercicios: ${error.message}`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  setCurrentYear();
  await loadEjercicios();
});
