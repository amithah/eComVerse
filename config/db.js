/**
 * db.js
 * @description :: exports database connection using mongoose
 */

const mongoose = require('mongoose');
const logger = require('./logger');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const uri = process.env.DB_URL;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((conn) => {
  })
  .catch((err) => logger.info('mongoose connection error:', err?.message));

let db = mongoose.connection;

db.once('open', () => {
  console.log('Connection Successful');
});

db.on('error', () => {
  console.log('Error in mongodb connection');
});

module.exports = mongoose;
