var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',
      {title: 'Trello test', scripts: '/javascripts/script.js'});
  next() // pass control to the next handler
});

module.exports = router;
