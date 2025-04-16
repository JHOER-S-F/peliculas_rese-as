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
      <button onclick="eliminarPelicula('${p.id}')">🗑️ Eliminar</button>
      <button onclick="editarPelicula('${p.id}')">✏️ Editar</button>
      <button onclick="verReseñas('${p.id}')">👁 Ver Reseñas</button>
      <button onclick="agregarReseña('${p.id}')">➕ Agregar Reseña</button>
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

  await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevaPelicula)
  });

  alert('✅ Película agregada');
  form.reset();
  cargarPeliculas();
});

// Eliminar película
async function eliminarPelicula(id) {
  if (confirm('¿Estás seguro de eliminar esta película?')) {
    await fetch(`${URL}/${id}`, { method: 'DELETE' });
    alert('🗑️ Película eliminada');
    cargarPeliculas();
  }
}

// Editar película (solo título, año, descripción)
async function editarPelicula(id) {
  const nuevoTitulo = prompt('Nuevo título:');
  const nuevoAño = prompt('Nuevo año:');
  const nuevaDescripcion = prompt('Nueva descripción:');

  await fetch(`${URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: nuevoTitulo,
      year: nuevoAño,
      description: nuevaDescripcion
    })
  });

  alert('✏️ Película editada');
  cargarPeliculas();
}

// Ver reseñas de una película
async function verReseñas(id) {
  const res = await fetch(`${URL}/${id}/reviews`);
  const reseñas = await res.json();

  if (reseñas.length === 0) return alert('❌ No hay reseñas aún.');

  let texto = '📋 Reseñas:\n\n';
  reseñas.forEach(r => {
    texto += `🧑 ${r.reviewer}: ⭐ ${r.rating}/5\n🗨️ ${r.comment}\n\n`;
  });

  alert(texto);
}

// Agregar reseña
async function agregarReseña(id) {
  const reviewer = prompt('¿Tu nombre?');
  const comment = prompt('¿Tu comentario?');
  const rating = prompt('¿Tu calificación del 1 al 5?');

  if (!reviewer || !comment || !rating) return alert('❌ Faltan datos');

  await fetch(`${URL}/${id}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewer, comment, rating: parseInt(rating) })
  });

  alert('✅ Reseña agregada');
}

cargarPeliculas();

