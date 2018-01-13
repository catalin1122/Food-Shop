var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000
  bodyParser = require('body-parser'),
  routes = require('./api/routes/shopRoutes');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);

console.log('Shop RESTful API server started on: ' + port);