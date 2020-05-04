var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

   res.render('users', { title: '用户管理' });
});

module.exports = router;
