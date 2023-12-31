/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const { NODE_ENV } = process.env;
const { PORT = 3005 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const key = process.env.JWT_SECRET || 'my-dev-key';

module.exports = {
  key,
  NODE_ENV,
  DB_ADDRESS,
  PORT,
};
