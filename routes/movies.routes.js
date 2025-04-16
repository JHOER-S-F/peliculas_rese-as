const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies.controller');

// Middleware de validación
const validateMovieFields = (req, res, next) => {
  const { title, year, genre, description } = req.body;
  if (!title || !year || !genre || !description) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios: title, year, genre, description' });
  }
  next();
};

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', validateMovieFields, createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;

