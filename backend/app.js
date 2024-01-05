const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const csurf = require('csurf');
const cors = require('cors');
const { isProduction } = require('./config/keys');

const usersRouter = require('./routes/api/users');
const gamesRouter = require("./routes/api/games");
const csrfRouter = require("./routes/api/csrf");

const app = express();

app.use(logger('dev')); // log request components (URL/method) to terminal
app.use(express.json()); // parse JSON request body
app.use(express.urlencoded({ extended: false })); // parse urlencoded request body
app.use(cookieParser()); // parse cookies as an object on req.cookies

if (!isProduction) {
    app.use(cors())
  }

app.use(
    csurf({
        cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
        }
    })
);

app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/csrf', csrfRouter);

module.exports = app;
