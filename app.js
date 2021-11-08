var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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
    //console.log("entered sequelize error handler");
    res.json('SequelizeForeignKeyConstraintError');
  } else {
    //console.log("entered else block of foreign key constraint handler")
    next(error)
  }
})

app.use((error, req, res, next) => {
  //console.log("entered constraint error handler");
  if (error.name === 'SequelizeUniqueConstraintError') {
    //console.log('correctly entered unique constraint block')
    res.json('SequelizeUniqueConstraintError');
  } else {
    //console.log('i am in next block wrongly')
    next(error)
  }
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //console.log("entered dfault error handler")
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*const port = process.env.PORT || 3001;
app.listen(port, function(err){
  if (err) console.log("Error in server setup")
  console.log(`Server listening on port ${port}`);
})*/

module.exports = app;
