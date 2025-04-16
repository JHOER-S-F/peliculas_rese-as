// frontend/app.js

const API_URL = 'http://localhost:3000/movies';

// 👉 Esta función se activa cuando se envía el formulario
document.getElementById('movie-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const newMovie = {
    title: document.getElementById('title').value,
    year: parseInt(document.getElementById('year').value),
    genre: document.getElementById('genre').value,
    description: document.getElementById('description').value
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie)
    });

    const data = await res.json();
    alert('Película agregada con éxito');
    getMovies(); // Carga de nuevo las películas
  } catch (err) {
    console.error('Error agregando película:', err);
  }
});

// 👉 Función para obtener y mostrar las películas
async function getMovies() {
  try {
    const res = await fetch(API_URL);
    const movies = await res.json();
    const container = document.getElementById('movies-container');
    container.innerHTML = '';

    movies.forEach(movie => {
      const div = document.createElement('div');
      div.classList.add('movie-card');
      div.innerHTML = `
        <h3>${movie.title} (${movie.year})</h3>
        <p><strong>Género:</strong> ${movie.genre}</p>
        <p>${movie.description}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error obteniendo películas:', err);
  }
}
