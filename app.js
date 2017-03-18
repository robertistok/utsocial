const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

module.exports = app;
