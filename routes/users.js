const express = require('express');

const userRouter = express.Router();
const celebrates = require('../middlewares/celebrates');

const {
  getUser,
  patchUsers,
} = require('../controllers/users');

userRouter.get('/users/me', celebrates.getUser, getUser);
userRouter.patch('/users/me', celebrates.patchUsers, patchUsers);

module.exports = { userRouter };
