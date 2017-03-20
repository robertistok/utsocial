const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`Up and running!\nFind the server at http://localhost:${app.get('port')}/`);
});
