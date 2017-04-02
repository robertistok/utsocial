const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const router = require('./router');

const app = express();

app.set('port', process.env.PORT || 3001);

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost/universocial');
}

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

router(app);

module.exports = app;
