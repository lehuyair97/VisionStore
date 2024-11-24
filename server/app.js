var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./config/db');  // Importing database config
const hbs = require('hbs');

var indexRouter = require('./routes/index');
var api = require('./routes/api');

require('dotenv').config();

var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Register Handlebars partials and helpers
hbs.registerPartials(path.join(__dirname, 'views/partials'));

hbs.registerHelper('eq', function(a, b) {
  return a === b ? true : false; // Trả về true hoặc false thay vì block helper
});

// Helper and
hbs.registerHelper('and', function(v1, v2) {
  return v1 && v2; // Trả về true nếu cả hai đều truthy, ngược lại trả về false
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/api', api);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  res.status(err.status || 500);
  res.render('error');
});

// Connect to the database
database.connect;  // Make sure to call the function here

module.exports = app;
