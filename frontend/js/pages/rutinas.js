import { getRutinas, getEjerciciosByRutina } from '../api/rutina.api.js';
import { setupUI } from '../ui.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function renderRutinas(rutinas) {
  const container = document.getElementById('rutinas-cards');
  if (!container) return;

  container.innerHTML = '';

  if (!rutinas.length) {
    container.textContent = 'No hay rutinas disponibles.';
    return;
  }

  container.innerHTML = rutinas
    .map(
      (rutina) => `
        <article class="bg-zinc-900 p-6 rounded-lg border-l-4 border-orange-accent card-lift">
          <h2 class="text-2xl font-bold mb-3 text-orange-accent">${rutina.nombre ?? 'Rutina sin nombre'}</h2>
          <p class="text-gray-300 mb-2">Descripcion: ${rutina.descripcion ?? 'Sin descripcion'}</p>
          <p class="text-gray-400 text-sm">Nivel: ${rutina.nivel ?? '-'}</p>
          <p class="text-gray-500 text-xs mt-3">Entrenador ID: ${rutina.id_entrenador ?? '-'}</p>
          <p class="text-gray-500 text-xs">Rutina ID: ${rutina.id_rutina ?? '-'}</p>
        </article>
      `
    )
    .join('');
}

function fillRutinaSelect(rutinas) {
  const select = document.getElementById('rutina-select');
  if (!select) return;

  select.innerHTML = '<option value="" class="text-gray-400">-- Elige una rutina --</option>';
  rutinas.forEach((rutina) => {
    const option = document.createElement('option');
    option.value = rutina.id_rutina;
    option.textContent = `${rutina.nombre} (ID ${rutina.id_rutina})`;
    select.appendChild(option);
  });
}

function renderEjerciciosByRutina(ejercicios) {
  const container = document.getElementById('rutina-ejercicios-cards');
  if (!container) return;

  container.innerHTML = '';

  if (!ejercicios.length) {
    container.textContent = 'Esta rutina no tiene ejercicios asociados.';
    return;
  }

  container.innerHTML = ejercicios
    .map(
      (ejercicio) => `
        <article class="bg-black/40 border border-zinc-700 p-5 rounded-lg card-lift">
          <h3 class="text-lg font-semibold text-orange-accent mb-2">${ejercicio.nombre ?? 'Ejercicio sin nombre'}</h3>
          <p class="text-gray-400 text-sm">ID Ejercicio: ${ejercicio.id_ejercicio ?? '-'}</p>
          <p class="text-gray-300 text-sm">Series: ${ejercicio.series ?? '-'}</p>
          <p class="text-gray-300 text-sm">Repeticiones: ${ejercicio.repeticiones ?? '-'}</p>
          <p class="text-gray-300 text-sm">Descanso (seg): ${ejercicio.descanso_seg ?? '-'}</p>
        </article>
      `
    )
    .join('');
}

async function loadRutinas() {
  const feedback = document.getElementById('rutinas-feedback');
  if (feedback) feedback.textContent = 'Cargando rutinas...';

  try {
    const rutinas = normalizeArray(await getRutinas());
    renderRutinas(rutinas);
    fillRutinaSelect(rutinas);
    if (feedback) feedback.textContent = `Rutinas cargadas: ${rutinas.length}`;
  } catch (error) {
    if (feedback) feedback.textContent = `Error al cargar rutinas: ${error.message}`;
  }
}

function setupEjerciciosByRutinaListener() {
  const select = document.getElementById('rutina-select');
  const feedback = document.getElementById('rutina-ejercicios-feedback');
  const cards = document.getElementById('rutina-ejercicios-cards');

  if (!select || !feedback || !cards) return;

  select.addEventListener('change', async (event) => {
    const idRutina = event.target.value;

    if (!idRutina) {
      feedback.textContent = 'Selecciona una rutina para ver ejercicios.';
      cards.innerHTML = '';
      return;
    }

    try {
      feedback.textContent = 'Cargando ejercicios de la rutina...';
      const ejercicios = normalizeArray(await getEjerciciosByRutina(idRutina));
      renderEjerciciosByRutina(ejercicios);
      feedback.textContent = `Ejercicios encontrados: ${ejercicios.length}`;
    } catch (error) {
      feedback.textContent = `Error al cargar ejercicios: ${error.message}`;
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  setupUI();
  setupEjerciciosByRutinaListener();
  await loadRutinas();
});
