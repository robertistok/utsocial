const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./api/router');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/universocial');

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

router(app);

app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

module.exports = app;
