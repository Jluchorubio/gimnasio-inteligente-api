import { getUsuarios, getRutinasByUsuario } from '../api/usuario.api.js';
import { setupUI } from '../ui.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function renderUsuariosTable(usuarios) {
  const tbody = document.getElementById('usuarios-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (!usuarios.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="py-4 px-4 text-gray-400">No hay usuarios registrados.</td></tr>';
    return;
  }

  tbody.innerHTML = usuarios
    .map(
      (usuario) => `
        <tr class="hover:bg-zinc-800/70 transition-colors">
          <td class="py-3 px-4">${usuario.id_usuario ?? '-'}</td>
          <td class="py-3 px-4 font-medium">${usuario.nombre ?? '-'}</td>
          <td class="py-3 px-4">${usuario.email ?? '-'}</td>
          <td class="py-3 px-4">${usuario.edad ?? '-'}</td>
          <td class="py-3 px-4">${usuario.peso ?? '-'}</td>
          <td class="py-3 px-4">${usuario.estatura ?? '-'}</td>
          <td class="py-3 px-4">${usuario.fecha_registro ? new Date(usuario.fecha_registro).toLocaleDateString() : '-'}</td>
        </tr>
      `
    )
    .join('');
}

function fillUserSelect(usuarios) {
  const select = document.getElementById('usuario-rutinas-select');
  if (!select) return;

  select.innerHTML = '<option value="" class="text-gray-400">-- Elige un usuario --</option>';
  usuarios.forEach((usuario) => {
    const option = document.createElement('option');
    option.value = usuario.id_usuario;
    option.textContent = `${usuario.nombre} (ID ${usuario.id_usuario})`;
    select.appendChild(option);
  });
}

function renderRutinasByUsuario(rutinas) {
  const container = document.getElementById('usuario-rutinas-cards');
  if (!container) return;

  container.innerHTML = '';

  if (!rutinas.length) {
    container.innerHTML = '<p class="text-gray-400">Este usuario no tiene rutinas asignadas.</p>';
    return;
  }

  container.innerHTML = rutinas
    .map(
      (rutina) => `
        <article class="bg-zinc-900 p-6 rounded-lg border-l-4 border-orange-accent card-lift">
          <h3 class="text-xl font-bold mb-3 text-orange-accent">${rutina.nombre ?? 'Rutina sin nombre'}</h3>
          <p class="text-gray-300 mb-2">Descripcion: ${rutina.descripcion ?? 'Sin descripcion'}</p>
          <p class="text-gray-400 text-sm">Nivel: ${rutina.nivel ?? 'No definido'}</p>
          <p class="text-gray-400 text-sm">Fecha inicio: ${rutina.fecha_inicio ? new Date(rutina.fecha_inicio).toLocaleDateString() : '-'}</p>
          <p class="text-gray-400 text-sm">Estado: ${rutina.estado ?? '-'}</p>
        </article>
      `
    )
    .join('');
}

async function loadUsuarios() {
  const feedback = document.getElementById('usuarios-feedback');
  if (feedback) feedback.textContent = 'Cargando usuarios...';

  try {
    const usuarios = normalizeArray(await getUsuarios());
    renderUsuariosTable(usuarios);
    fillUserSelect(usuarios);
    if (feedback) feedback.textContent = `Usuarios cargados: ${usuarios.length}`;
  } catch (error) {
    if (feedback) feedback.textContent = `Error al cargar usuarios: ${error.message}`;
  }
}

function setupRutinasByUsuarioListener() {
  const select = document.getElementById('usuario-rutinas-select');
  const feedback = document.getElementById('usuario-rutinas-feedback');
  const cards = document.getElementById('usuario-rutinas-cards');

  if (!select || !feedback || !cards) return;

  select.addEventListener('change', async (event) => {
    const idUsuario = event.target.value;

    if (!idUsuario) {
      feedback.textContent = 'Selecciona un usuario para ver sus rutinas.';
      cards.innerHTML = '';
      return;
    }

    try {
      feedback.textContent = 'Cargando rutinas del usuario...';
      const rutinas = normalizeArray(await getRutinasByUsuario(idUsuario));
      renderRutinasByUsuario(rutinas);
      feedback.textContent = `Rutinas encontradas: ${rutinas.length}`;
    } catch (error) {
      feedback.textContent = `Error al consultar rutinas: ${error.message}`;
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  setupUI();
  setupRutinasByUsuarioListener();
  await loadUsuarios();
});
