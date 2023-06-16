/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, DB_ADDRESS } = require('./config');
const { userRouter } = require('./routes/users');
const { movieRouter } = require('./routes/movies');
const { auth } = require('./middlewares/auth');
const { signUp, signIn } = require('./controllers/auth');

const app = express();

app.use(cors());

mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });

app.post('/signup', signUp);
app.post('/signin', signIn);

app.use(auth);

app.use(userRouter);
app.use(movieRouter);

app.listen(PORT, () => {
  console.log(`Слушаем порт ${PORT}`);
});
