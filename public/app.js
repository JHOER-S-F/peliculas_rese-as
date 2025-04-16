const URL = 'http://localhost:3000/movies';
const contenedor = document.getElementById('peliculas');
const form = document.getElementById('formAgregar');

// Mostrar todas las películas
async function cargarPeliculas() {
  contenedor.innerHTML = '';
  const res = await fetch(URL);
  const peliculas = await res.json();

  peliculas.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${p.title} (${p.year})</h3>
      <p><strong>Género:</strong> ${p.genre}</p>
      <p>${p.description}</p>
      <button onclick="eliminarPelicula('${p.id}')">Eliminar</button>
      <button onclick="editarPelicula('${p.id}')">Editar</button>
    `;
    contenedor.appendChild(div);
  });
}

// Crear nueva película
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nuevaPelicula = {
    title: document.getElementById('title').value,
    year: document.getElementById('year').value,
    genre: document.getElementById('genre').value,
    description: document.getElementById('description').value
  };

  try {
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaPelicula)
    });

    if (!res.ok) throw new Error('Error al agregar la película.');

    alert('✅ Película agregada correctamente.');
    form.reset();
    cargarPeliculas();
  } catch (error) {
    alert('❌ Hubo un error al agregar la película.');
    console.error(error);
  }
});

// Eliminar película con confirmación
async function eliminarPelicula(id) {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta película?');
  if (!confirmacion) return;

  try {
    const res = await fetch(`${URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar');

    alert('✅ Película eliminada correctamente.');
    cargarPeliculas();
  } catch (error) {
    alert('❌ No se pudo eliminar la película.');
    console.error(error);
  }
}

// Editar película (solo año, título, descripción)
async function editarPelicula(id) {
  const nuevoTitulo = prompt('Nuevo título:');
  const nuevoAño = prompt('Nuevo año:');
  const nuevaDescripcion = prompt('Nueva descripción:');

  if (!nuevoTitulo || !nuevoAño || !nuevaDescripcion) {
    alert('❌ Todos los campos son obligatorios para editar.');
    return;
  }

  try {
    const res = await fetch(`${URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: nuevoTitulo,
        year: nuevoAño,
        description: nuevaDescripcion
      })
    });

    if (!res.ok) throw new Error('Error al editar');

    alert('✅ Película actualizada correctamente.');
    cargarPeliculas();
  } catch (error) {
    alert('❌ No se pudo editar la película.');
    console.error(error);
  }
}

cargarPeliculas();
