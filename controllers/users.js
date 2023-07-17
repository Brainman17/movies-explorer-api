const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { key } = require('../config');

const getUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const patchUsers = (req, res, next) => {
  const userId = req.user._id;

  User
    .findByIdAndUpdate(
      userId,
      { name: req.body.name, email: req.body.email },
      { new: true },
    )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, key, {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUser,
  patchUsers,
  createUser,
  login,
};
