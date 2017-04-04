'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

var router = require('./router');

var app = express();

app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === 'production') {
  var staticFiles = express.static(path.join(__dirname, '/../client/build'));
  app.use(staticFiles);
}

// MongodDb connection
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost/universocial');
}

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

router(app);

module.exports = app;