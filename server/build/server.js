'use strict';

var app = require('./app');

app.listen(app.get('port'), function () {
  console.log('Up and running!\nFind the server at http://localhost:' + app.get('port') + '/');
});