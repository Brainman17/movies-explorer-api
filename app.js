/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { PORT, DB_ADDRESS } = require('./config');
const { userRouter } = require('./routes/users');
const { movieRouter } = require('./routes/movies');
const { auth } = require('./middlewares/auth');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const celebrates = require('./middlewares/celebrates');
const { createUser, login } = require('./controllers/users');
const { NotFoundError } = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

app.use(requestLogger);

app.post('/signup', celebrates.signUp, createUser);
app.post('/signin', celebrates.signIn, login);

app.use(auth);

app.use(userRouter);
app.use(movieRouter);

app.use('*', (res, req, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

app.use(errorLogger);

app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`Слушаем порт ${PORT}`);
});
