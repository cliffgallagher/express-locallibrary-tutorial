const express = require('express');
var cookieParser = require('cookie-parser');
const path = require('path');
const catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

// catalog calls
app.use('/catalog', catalogRouter);
app.use('/catalog/*', catalogRouter);

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
    res.json('SequelizeForeignKeyConstraintError');
  } else {
    next()
  }
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(9000);