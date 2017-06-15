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

app.all('*', (req, res, next) => {
	if (req.headers['x-forwarded-proto'] !== 'https') {
		res.redirect(`https://${req.headers.host}${req.url}`);
	} else next();
});

// MongodDB connection
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'production') {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect('mongodb://localhost/universocial');
}

app.set('port', process.env.PORT || 3001);

module.exports = app;
