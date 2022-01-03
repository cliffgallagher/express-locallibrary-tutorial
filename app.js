require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const checkAuth = require('./check-auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// handle SequelizeForeignKeyConstraint errors
app.use((error, req, res, next) => {
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    res.json({
      "errors": [
        {
          'msg': 'SequelizeForeignKeyConstraintError'
        }
      ]
    });
  } else {
    next(error)
  }
})

app.use((error, req, res, next) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    //console.log('entered error handler in app.js')
    res.status(409).json({
      "errors": [
        {
          'msg': 'SequelizeUniqueConstraintError',
          'type': error.errors[0].path
        }
      ]
    });
  } else {
    next(error)
  }
})

app.use((error, req, res, next) => {
  if (error.name === 'TokenExpiredError') {
    res.json(error);
  } else {
    next(error)
  }
})

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (err.name.toLowerCase().includes('error')) {
    res.json({
      "errors": [
        {
          'msg': 'Invalid input'
        }
      ]
    });
  } else {
    res.end()
  }
});

module.exports = app;
