const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller');

// Reseñas por película
router.get('/:id/reviews', reviewsController.getReviewsByMovieId);
router.post('/:id/reviews', reviewsController.addReviewToMovie);

module.exports = router;
