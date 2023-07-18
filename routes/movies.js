const express = require('express');

const movieRouter = express.Router();
const celebrates = require('../middlewares/celebrates');

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', celebrates.createMovies, createMovies);
movieRouter.delete('/movies/:movieId', deleteMovies);

module.exports = { movieRouter };
