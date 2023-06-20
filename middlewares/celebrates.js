const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { REGEX_LINK } = require('../utils/regex');

const signUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const getUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId().required(),
  }),
});

const patchUsers = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REGEX_LINK),
    trailer: Joi.string().required().regex(REGEX_LINK),
    thumbnail: Joi.string().required().regex(REGEX_LINK),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const checkIdMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId().required(),
  }),
});

module.exports = {
  signUp, signIn, getUser, patchUsers, createMovies, checkIdMovie,
};
