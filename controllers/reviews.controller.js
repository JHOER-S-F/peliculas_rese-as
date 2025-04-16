const { readJSON, writeJSON } = require('../utils/fileManager');
const { randomUUID } = require('crypto');

const MOVIES_FILE = 'movies.json';
const REVIEWS_FILE = 'reviews.json';

exports.getReviewsByMovieId = async (req, res, next) => {
  try {
    const reviews = await readJSON(REVIEWS_FILE);
    const filtered = reviews.filter(r => r.movieId === req.params.id);
    res.json(filtered);
  } catch (err) {
    next(err);
  }
};

exports.addReviewToMovie = async (req, res, next) => {
  try {
    const { author, content, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'El rating debe estar entre 1 y 5' });
    }

    const movies = await readJSON(MOVIES_FILE);
    const movieExists = movies.some(m => m.id === req.params.id);
    if (!movieExists) return res.status(404).json({ error: 'Película no encontrada' });

    const reviews = await readJSON(REVIEWS_FILE);

    const newReview = {
      id: randomUUID(),
      movieId: req.params.id,
      author,
      content,
      rating,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    await writeJSON(REVIEWS_FILE, reviews);

    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
};
