/* eslint-disable no-console */

// Пакеты
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

// config.js
const { PORT, DB_ADDRESS } = require('./config');

// routes
const { userRouter } = require('./routes/users');
const { movieRouter } = require('./routes/movies');

// middlewares
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { auth } = require('./middlewares/auth');
const { centralErrorHandler } = require('./middlewares/centralErrorHandler');
const { limiter } = require('./middlewares/express-rate-limit');

// celebrates
const celebrates = require('./middlewares/celebrates');

// controllers
const { createUser, login } = require('./controllers/users');

// errors
const { NotFoundError } = require('./errors/NotFoundError');

const app = express();

mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });

app.use(cors());
app.use(helmet());
app.use(limiter);

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
  console.log(`Слушаем ${PORT}`);
});

// ssh jegor-andreychuk@51.250.5.47
