require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const db = require('./db/connection');
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Database connection
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
