var express = require('express');
var router = express.Router();
var usersDao = require('../model/usersDao');
var usersMock = require('../mock/usersMock');
var title = "用户管理";
/* 获取全部数据 */
router.get('/', function(req, res, next) {
  usersDao.queryAll(req, res, function(data){
      res.render('users/list', {
          title:title,
          users: data
      });
  });
});

router.get('/addUser', function(req, res, next) {
   var user = usersMock.newUser()['one']; //  取假数据
   res.render('users/one',{title:title,user:user,page:'addUser'});
});

router.post('/addUser',function(req, res, next) {  
  usersDao.add(req, res, function(data){
    if(data.code == 200){
        res.redirect('/users');
    }
  });
})

router.get('/queryById/:id', function(req, res, next) {
  usersDao.queryById(req, res, function(data){
    res.render('users/one', {
        title:title,
        user: data,
        page:''
    });
  });
});

router.post('/updateUser',function(req, res, next) {
  usersDao.update(req, res, function(data){
    if(data.code == 200){
        res.redirect('/users');
    }
  });
});

router.get('/deleteById/:id', function(req, res, next) {
  usersDao.delete(req, res, function(data){
    if(data.code == 200){
        res.redirect('/users');
    }
  });
});

module.exports = router;
