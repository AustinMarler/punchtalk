var express = require('express');
var privateRouter = express.Router();

privateRouter.get('/', function(req, res, next) {
  res.json({
    foo: 'bar'
  })
});

module.exports = privateRouter;