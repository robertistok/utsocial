import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';

import router from './router';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

app.use(router);

app.use('/*', staticFiles);

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'production') {
	app.get('*', (req, res) => res.redirect(`https://${req.headers.host}${req.url}`));
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect('mongodb://localhost/universocial');
}

app.set('port', process.env.PORT || 3001);

module.exports = app;
