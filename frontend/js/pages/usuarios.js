import { getUsuarios, getRutinasByUsuario } from '../api/usuario.api.js';

function normalizeArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function setCurrentYear() {
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
}

function renderUsuariosTable(usuarios) {
  const tbody = document.getElementById('usuarios-table-body');
  tbody.innerHTML = '';

  if (!usuarios.length) {
    tbody.innerHTML = '<tr><td colspan="7">No hay usuarios registrados.</td></tr>';
    return;
  }

  tbody.innerHTML = usuarios
    .map(
      (usuario) => `
        <tr>
          <td>${usuario.id_usuario ?? '-'}</td>
          <td>${usuario.nombre ?? '-'}</td>
          <td>${usuario.email ?? '-'}</td>
          <td>${usuario.edad ?? '-'}</td>
          <td>${usuario.peso ?? '-'}</td>
          <td>${usuario.estatura ?? '-'}</td>
          <td>${usuario.fecha_registro ? new Date(usuario.fecha_registro).toLocaleDateString() : '-'}</td>
        </tr>
      `
    )
    .join('');
}

function fillUserSelect(usuarios) {
  const select = document.getElementById('usuario-rutinas-select');

  usuarios.forEach((usuario) => {
    const option = document.createElement('option');
    option.value = usuario.id_usuario;
    option.textContent = `${usuario.nombre} (ID ${usuario.id_usuario})`;
    select.appendChild(option);
  });
}

function renderRutinasByUsuario(rutinas) {
  const container = document.getElementById('usuario-rutinas-cards');
  container.innerHTML = '';

  if (!rutinas.length) {
    container.textContent = 'Este usuario no tiene rutinas asignadas.';
    return;
  }

  container.innerHTML = rutinas
    .map(
      (rutina) => `
        <article>
          <h3>${rutina.nombre ?? 'Rutina sin nombre'}</h3>
          <p>Descripcion: ${rutina.descripcion ?? 'Sin descripcion'}</p>
          <p>Nivel: ${rutina.nivel ?? 'No definido'}</p>
          <p>Fecha inicio: ${rutina.fecha_inicio ? new Date(rutina.fecha_inicio).toLocaleDateString() : '-'}</p>
          <p>Estado: ${rutina.estado ?? '-'}</p>
        </article>
      `
    )
    .join('');
}

async function loadUsuarios() {
  const feedback = document.getElementById('usuarios-feedback');

  try {
    feedback.textContent = 'Cargando usuarios...';
    const usuarios = normalizeArray(await getUsuarios());
    renderUsuariosTable(usuarios);
    fillUserSelect(usuarios);
    feedback.textContent = `Usuarios cargados: ${usuarios.length}`;
  } catch (error) {
    feedback.textContent = `Error al cargar usuarios: ${error.message}`;
  }
}

function setupRutinasByUsuarioListener() {
  const select = document.getElementById('usuario-rutinas-select');
  const feedback = document.getElementById('usuario-rutinas-feedback');

  select.addEventListener('change', async (event) => {
    const idUsuario = event.target.value;

    if (!idUsuario) {
      feedback.textContent = 'Selecciona un usuario para ver sus rutinas.';
      document.getElementById('usuario-rutinas-cards').innerHTML = '';
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
  setCurrentYear();
  setupRutinasByUsuarioListener();
  await loadUsuarios();
});
