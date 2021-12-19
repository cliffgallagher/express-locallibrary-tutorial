require('dotenv').config()
const express = require('express');
var cookieParser = require('cookie-parser');
const path = require('path');
const catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
const usersRouter = require('./routes/users');
const { cookie } = require('express-validator');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client', 'build')));

// catalog calls
app.use('/catalog', catalogRouter);
app.use('/catalog/*', catalogRouter);
app.use('/users', usersRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// handle SequelizeForeignKeyConstraint errors
app.use((error, req, res, next) => {
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    //console.log("entered sequelize error handler");
    res.json({
      "errors": [
        {
          'msg': 'SequelizeForeignKeyConstraintError'
        }
      ]
    });
    //res.json('SequelizeForeignKeyConstraintError');
  } else {
    //console.log("entered else block of foreign key constraint handler")
    next(error)
  }
})

app.use((error, req, res, next) => {
  //console.log("entered constraint error handler");
  if (error.name === 'SequelizeUniqueConstraintError') {
    //console.log('correctly entered unique constraint block')
    res.json({
      "errors": [
        {
          'msg': 'SequelizeUniqueConstraintError',
          'type': error.errors[0].path
        }
      ]
    });
  } else {
    //console.log('i am in next block wrongly')
    next(error)
  }
})

app.use((error, req, res, next) => {
  //console.log("entered constraint error handler");
  if (error.name === 'TokenExpiredError') {
    //console.log('correctly entered unique constraint block')
    res.json(error);
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
  console.log('error in default handler: ' + JSON.stringify(err))
  if (err.name.toLowerCase().includes('error')) {
    //console.log('entered if block')
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
  //res.render('error');

});

app.listen(9000);