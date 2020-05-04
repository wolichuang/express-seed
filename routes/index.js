var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '后台管理' });
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});

module.exports = router;
