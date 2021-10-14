const express = require('express');
const path = require('path');
const app = express();
const catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site


app.use(express.static(path.join(__dirname, 'client', 'build')));

// GET catalog home page.
app.use('/catalog', catalogRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(9000);