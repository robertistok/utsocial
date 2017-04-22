// const express = require('express');
//
// const app = express();
//
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const path = require('path');
// const router = require('./router');
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
// const staticFiles = express.static(path.join(__dirname, '../../client/build'));
// app.use(staticFiles);
//
// // if (process.env.NODE_ENV === 'production') {
// //
// //   app.use('/*', staticFiles);
// // }
//
// // MongodDb connection
// mongoose.Promise = global.Promise;
// if (process.env.NODE_ENV !== 'production') {
//   mongoose.connect('mongodb://localhost/universocial');
// }
//
// app.use(morgan('combined'));
// app.use(bodyParser.json({ type: '*/*' }));
// app.use(bodyParser.urlencoded({ extended: false }));
//
// router(app);
//
// app.use('/*', staticFiles);
//
// app.set('port', 3001);
//
// module.exports = app;

import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

router.get('/cities', (req, res) => {
  const cities = [
    { name: 'New York City', population: 8175133 },
    { name: 'Los Angeles', population: 3792621 },
    { name: 'Chicago', population: 2695598 }
  ];
  res.json(cities);
});

app.use(router);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles);

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
});
