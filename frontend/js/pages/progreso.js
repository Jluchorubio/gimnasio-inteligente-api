import { getUsuarios } from '../api/usuario.api.js';
import { getProgresoMensualByUsuario } from '../api/progreso.api.js';
import { setupUI } from '../ui.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function fillUserSelect(usuarios) {
  const select = document.getElementById('progreso-usuario-select');
  if (!select) return;

  select.innerHTML = '<option value="" class="text-gray-400">-- Elige un usuario --</option>';
  usuarios.forEach((usuario) => {
    const option = document.createElement('option');
    option.value = usuario.id_usuario;
    option.textContent = `${usuario.nombre} (ID ${usuario.id_usuario})`;
    select.appendChild(option);
  });
}

function renderProgresoTable(registros) {
  const tbody = document.getElementById('progreso-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (!registros.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="py-4 px-4 text-gray-400">Sin registros de progreso para este usuario.</td></tr>';
    return;
  }

  tbody.innerHTML = registros
    .map(
      (registro) => `
        <tr class="hover:bg-zinc-800/70 transition-colors">
          <td class="py-3 px-4">${registro.fecha_registro ? new Date(registro.fecha_registro).toLocaleDateString() : '-'}</td>
          <td class="py-3 px-4">${registro.peso_actual ?? '-'}</td>
          <td class="py-3 px-4">${registro.porcentaje_grasa ?? '-'}</td>
          <td class="py-3 px-4">${registro.masa_muscular ?? '-'}</td>
        </tr>
      `
    )
    .join('');
}

async function loadUsuariosIntoSelect() {
  const feedback = document.getElementById('progreso-feedback');
  if (feedback) feedback.textContent = 'Cargando usuarios...';

  try {
    const usuarios = normalizeArray(await getUsuarios());
    fillUserSelect(usuarios);
    if (feedback) feedback.textContent = 'Selecciona un usuario para ver su progreso mensual.';
  } catch (error) {
    if (feedback) feedback.textContent = `Error al cargar usuarios: ${error.message}`;
  }
}

function setupProgresoListener() {
  const select = document.getElementById('progreso-usuario-select');
  const feedback = document.getElementById('progreso-feedback');
  const tbody = document.getElementById('progreso-table-body');

  if (!select || !feedback || !tbody) return;

  select.addEventListener('change', async (event) => {
    const idUsuario = event.target.value;

    if (!idUsuario) {
      feedback.textContent = 'Selecciona un usuario para consultar progreso.';
      tbody.innerHTML = '';
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
  setupUI();
  setupProgresoListener();
  await loadUsuariosIntoSelect();
});
