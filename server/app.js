import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import flash from 'connect-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import router from './router';

const app = express();
const staticFiles = express.static(path.join(__dirname, '../../client/build'));

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: 'rzmc792fkgt5'
	})
);
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/*', staticFiles);
app.use(staticFiles);
app.use(router);

// MongodDb connection
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'production') {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect('mongodb://localhost/universocial');
}

app.set('port', process.env.PORT || 3001);

module.exports = app;
