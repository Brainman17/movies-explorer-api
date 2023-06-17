const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch((err) => next(err));
};

const createMovies = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => next(err));
};

const deleteMovies = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;

  Movie
    .findById(movieId)
    .then((film) => {
      if (!film) {
        throw new NotFoundError('Фильм с таким id не существует!');
      }

      if (film.owner.toString() !== owner) {
        throw new ForbiddenError('Нельзя удалить чужой фильм!');
      } return Movie.findByIdAndRemove(movieId);
    })
    .then((deleteMovie) => res.send({ data: deleteMovie }))
    .catch((err) => next(err));
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
