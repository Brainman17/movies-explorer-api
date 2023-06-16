/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const movieRouter = express.Router();

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', createMovies);
movieRouter.delete('/movies/:movieId', deleteMovies);

module.exports = { movieRouter };
