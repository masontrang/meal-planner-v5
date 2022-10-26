const express = require('express');
const xss = require('xss-clean');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
// const routes = require("./routes");
const cookieParser = require('cookie-parser');
const apiRouter = require('./api');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

// set security HTTP headers
// app.use(helmet());

// parse json request body
// headers:
//  content-type: application/json
// body:
//  { "key": "value" }
app.use(express.json());

// parse urlencoded request body
// content-type: plain/text
// server.com/path/to/something?hello=world&page=2
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
// content-encoding: gzip
app.use(compression());

// enable cors
// browser protection
app.use(cors());
app.options('*', cors());

app.use(cookieParser());

// const usersRouter = require('./routes/users');
// const recipesRouter = require('./routes/recipes');
// const mealsRouter = require('./routes/meals');
// const groupsRouter = require('./routes/groups');

// app.use('/users', usersRouter);
// app.use('/recipes', recipesRouter);
// app.use('/meals', mealsRouter);
// app.use('/groups', groupsRouter);

app.use('/api', apiRouter);

// catch unrecognized routes and return index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Find Single Group by Name and Join if joinCode matches
// send back a 404 error for any unknown api request
// app.use((_, res) => {
//   return res.status(httpStatus.NOT_FOUND).send('Not found');
// });

module.exports = app;
