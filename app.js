/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`Слушаем порт ${PORT}`);
});
