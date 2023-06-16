const User = require('../models/user');

const getUsers = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
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

module.exports = {
  getUsers,
  patchUsers,
};
