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

app.listen(9000);