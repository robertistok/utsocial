import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';

const router = require('./router');

const app = express();

// app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

app.use(router);

app.use('/*', staticFiles);

//
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   next();
// });
//
//

// MongodDb connection
// mongoose.Promise = global.Promise;
// if (process.env.NODE_ENV !== 'production') {
//   mongoose.connect('mongodb://localhost/universocial');
// }

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(
    `Up and running!\nFind the server at http://localhost:${app.get('port')}/`
  );
});

// module.exports = app;
