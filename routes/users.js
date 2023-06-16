/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const userRouter = express.Router();

const {
  getUsers,
  patchUsers,
} = require('../controllers/users');

userRouter.get('/users/me', getUsers);
userRouter.patch('/users/me', patchUsers);

module.exports = { userRouter };
