require('dotenv').config()
const express = require('express');
const helmet = require("helmet");
var cookieParser = require('cookie-parser');
const path = require('path');
const catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
const usersRouter = require('./routes/users');
const { cookie } = require('express-validator');


const app = express();

/*app.set('trust proxy', 'true')
app.use((req, res, next) => {
  if (req.secure) {
    return next()
  }
  res.redirect(`https://${req.hostname}${req.url}`)
})*/

/*app.use((req, res) => {
  console.log('protocol: ' + req.protocol + ', hostname: ' + req.hostname + ', path: ' + req.path);
  if (!req.secure) {
    //res.redirect(`https://${req.hostname}${req.path}`)
    res.redirect(`https://cliffgallagher-express-project.herokuapp.com`)
  } 
})*/

//app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", "'sha256-OvqKZ9cjYHWKUBBRfJn1jQUTQQkkM00VwLgFsOnDAXM='", "https://www.google-analytics.com", "https://ssl.google-analytics.com"],
      "img-src": ["'self'", "data:", "https://www.google-analytics.com"],
      "connect-src": ["'self'", "https://www.google-analytics.com"]
    },
  })
);

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
    res.json({
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
  //console.log('error in default handler: ' + JSON.stringify(err))
  if (err.name.toLowerCase().includes('error')) {
    res.json({
      "errors": [
        {
          'msg': 'Error. Please try again later.'
        }
      ]
    });
  } else {
    res.end()
  }

});

app.listen(process.env.PORT || 9000);