const express = require('express');

const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

// if (process.env.NODE_ENV === 'production') {
//
//   app.use('/*', staticFiles);
// }

// MongodDb connection
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost/universocial');
}

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

router(app);

app.use('/*', staticFiles);

app.set('port', 3001);

module.exports = app;
