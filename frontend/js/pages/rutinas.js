import { getRutinas, getEjerciciosByRutina } from '../api/rutina.api.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function setCurrentYear() {
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
}

function renderRutinas(rutinas) {
  const container = document.getElementById('rutinas-cards');
  container.innerHTML = '';

  if (!rutinas.length) {
    container.textContent = 'No hay rutinas disponibles.';
    return;
  }

  container.innerHTML = rutinas
    .map(
      (rutina) => `
        <article>
          <h2>${rutina.nombre ?? 'Rutina sin nombre'}</h2>
          <p>Descripcion: ${rutina.descripcion ?? 'Sin descripcion'}</p>
          <p>Nivel: ${rutina.nivel ?? '-'}</p>
          <p>Entrenador ID: ${rutina.id_entrenador ?? '-'}</p>
          <p>Rutina ID: ${rutina.id_rutina ?? '-'}</p>
        </article>
      `
    )
    .join('');
}

function fillRutinaSelect(rutinas) {
  const select = document.getElementById('rutina-select');

  rutinas.forEach((rutina) => {
    const option = document.createElement('option');
    option.value = rutina.id_rutina;
    option.textContent = `${rutina.nombre} (ID ${rutina.id_rutina})`;
    select.appendChild(option);
  });
}

function renderEjerciciosByRutina(ejercicios) {
  const container = document.getElementById('rutina-ejercicios-cards');
  container.innerHTML = '';

  if (!ejercicios.length) {
    container.textContent = 'Esta rutina no tiene ejercicios asociados.';
    return;
  }

  container.innerHTML = ejercicios
    .map(
      (ejercicio) => `
        <article>
          <h3>${ejercicio.nombre ?? 'Ejercicio sin nombre'}</h3>
          <p>ID Ejercicio: ${ejercicio.id_ejercicio ?? '-'}</p>
          <p>Series: ${ejercicio.series ?? '-'}</p>
          <p>Repeticiones: ${ejercicio.repeticiones ?? '-'}</p>
          <p>Descanso (seg): ${ejercicio.descanso_seg ?? '-'}</p>
        </article>
      `
    )
    .join('');
}

async function loadRutinas() {
  const feedback = document.getElementById('rutinas-feedback');

  try {
    feedback.textContent = 'Cargando rutinas...';
    const rutinas = normalizeArray(await getRutinas());
    renderRutinas(rutinas);
    fillRutinaSelect(rutinas);
    feedback.textContent = `Rutinas cargadas: ${rutinas.length}`;
  } catch (error) {
    feedback.textContent = `Error al cargar rutinas: ${error.message}`;
  }
}

function setupEjerciciosByRutinaListener() {
  const select = document.getElementById('rutina-select');
  const feedback = document.getElementById('rutina-ejercicios-feedback');

  select.addEventListener('change', async (event) => {
    const idRutina = event.target.value;

    if (!idRutina) {
      feedback.textContent = 'Selecciona una rutina para ver ejercicios.';
      document.getElementById('rutina-ejercicios-cards').innerHTML = '';
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
  setCurrentYear();
  setupEjerciciosByRutinaListener();
  await loadRutinas();
});
