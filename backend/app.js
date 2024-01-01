const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/api/users');
const gamesRouter = require("./routes/api/games");

const app = express();


app.use(logger('dev')); // log request components (URL/method) to terminal
app.use(express.json()); // parse JSON request body
app.use(express.urlencoded({ extended: false })); // parse urlencoded request body
app.use(cookieParser()); // parse cookies as an object on req.cookies

app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);

module.exports = app;
