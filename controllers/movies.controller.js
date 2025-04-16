const { readJSON, writeJSON } = require('../utils/fileManager');
const { randomUUID } = require('crypto');

const FILE = 'movies.json';

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await readJSON(FILE);
    const { genre } = req.query;

    // Filtro por género si se pasa por query param
    if (genre) {
      const filtered = movies.filter(movie =>
        movie.genre.toLowerCase() === genre.toLowerCase()
      );
      return res.json(filtered);
    }

    res.json(movies);
  } catch (err) {
    next(err);
  }
};

exports.getMovieById = async (req, res, next) => {
  try {
    const movies = await readJSON(FILE);
    const movie = movies.find(m => m.id === req.params.id);

    if (!movie) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    res.json(movie);
  } catch (err) {
    next(err);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const { title, year, genre, description } = req.body;
    const movies = await readJSON(FILE);

    const newMovie = {
      id: randomUUID(),
      title,
      year,
      genre,
      description,
      createdAt: new Date().toISOString(),
    };

    movies.push(newMovie);
    await writeJSON(FILE, movies);

    res.status(201).json(newMovie);
  } catch (err) {
    next(err);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    const { title, year, genre, description } = req.body;
    const movies = await readJSON(FILE);
    const index = movies.findIndex(m => m.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    if (title) movies[index].title = title;
    if (year) movies[index].year = year;
    if (genre) movies[index].genre = genre;
    if (description) movies[index].description = description;

    await writeJSON(FILE, movies);
    res.json(movies[index]);
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movies = await readJSON(FILE);
    const filtered = movies.filter(m => m.id !== req.params.id);

    if (filtered.length === movies.length) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    await writeJSON(FILE, filtered);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
