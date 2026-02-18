import { getUsuarios } from '../api/usuario.api.js';
import { getProgresoMensualByUsuario } from '../api/progreso.api.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function setCurrentYear() {
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
}

function fillUserSelect(usuarios) {
  const select = document.getElementById('progreso-usuario-select');

  usuarios.forEach((usuario) => {
    const option = document.createElement('option');
    option.value = usuario.id_usuario;
    option.textContent = `${usuario.nombre} (ID ${usuario.id_usuario})`;
    select.appendChild(option);
  });
}

function renderProgresoTable(registros) {
  const tbody = document.getElementById('progreso-table-body');
  tbody.innerHTML = '';

  if (!registros.length) {
    tbody.innerHTML = '<tr><td colspan="4">Sin registros de progreso para este usuario.</td></tr>';
    return;
  }

  tbody.innerHTML = registros
    .map(
      (registro) => `
        <tr>
          <td>${registro.fecha_registro ? new Date(registro.fecha_registro).toLocaleDateString() : '-'}</td>
          <td>${registro.peso_actual ?? '-'}</td>
          <td>${registro.porcentaje_grasa ?? '-'}</td>
          <td>${registro.masa_muscular ?? '-'}</td>
        </tr>
      `
    )
    .join('');
}

async function loadUsuariosIntoSelect() {
  const feedback = document.getElementById('progreso-feedback');

  try {
    feedback.textContent = 'Cargando usuarios...';
    const usuarios = normalizeArray(await getUsuarios());
    fillUserSelect(usuarios);
    feedback.textContent = 'Selecciona un usuario para ver su progreso mensual.';
  } catch (error) {
    feedback.textContent = `Error al cargar usuarios: ${error.message}`;
  }
}

function setupProgresoListener() {
  const select = document.getElementById('progreso-usuario-select');
  const feedback = document.getElementById('progreso-feedback');

  select.addEventListener('change', async (event) => {
    const idUsuario = event.target.value;

    if (!idUsuario) {
      feedback.textContent = 'Selecciona un usuario para consultar progreso.';
      document.getElementById('progreso-table-body').innerHTML = '';
      return;
    }

    try {
      feedback.textContent = 'Consultando progreso mensual...';
      const progreso = normalizeArray(await getProgresoMensualByUsuario(idUsuario));
      renderProgresoTable(progreso);
      feedback.textContent = `Registros encontrados: ${progreso.length}`;
    } catch (error) {
      feedback.textContent = `Error al consultar progreso: ${error.message}`;
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  setCurrentYear();
  setupProgresoListener();
  await loadUsuariosIntoSelect();
});
