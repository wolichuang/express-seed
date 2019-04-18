var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require("fs");
var globals = require('../config/globals');

/* 全栈首页 */
router.get('/', function(req, res, next) {
  req.session.count = req.session.count || 0; // 设置session
  var sessionCount = req.session.count++;
  var users = [
	  { name: 'tobi', email: 'tobi@learnboost.com' },
	  { name: 'loki', email: 'loki@learnboost.com' },
	  { name: 'jane', email: 'jane@learnboost.com' }
  ];
  res.render('index', { title: 'Express', cookies:'Admin',users:users,session: sessionCount,layout:"layout-default"});
});

// json
router.get('/json',function(req, res, next) {
    res.json({
      title: 'express4.0 json'
    }) 
});

// 字符串
router.get('/string',function(req, res, next) {
    var start = new Date().getTime(); // 当前时间
    res.send(start + '<===>some html');
});

// 处理cookie
router.get('/cookie',function(req, res, next) {
    const options = {
      domain:'127.0.0.1',
      path:'/',
      maxAge: 10 * 60 * 1000, // cookie有效时长
      expires: new Date('2019-02-02'),  // cookie失效时间
      httpOnly: false,  // 是否只用于http请求中获取
      overwrite: false  // 是否允许重写 
    }
    res.cookie('name', 'tobi', options);
    res.send(req.cookies.name);
});

// 处理get请求
router.get('/info/:name',function(req,res,next){
    var name = req.params.name;
    res.send('<h1>Hello ' + name +'</h1>');
});

/* ajax数据提交 */
router.get("/doAjax", function(req, res, next) {
    // req 接收请求
    var username = req.query.username;
    var password = req.query.password;
    // res 返回到页面
    // res.json(['success', "服务器收到一个Ajax get请求 用户名 ["+username+"] 密码 ["+password+"]"]);
    res.json({
      code: "success",
      info:
        "服务器收到一个Ajax get请求 用户名 [" +
        username +
        "] 密码 [" +
        password +
        "]"
    });
  });
  
router.post("/doAjax", function(req, res, next) {
  // req 接收请求
  var username = req.body.username;
  var password = req.body.password;
  // res 返回到页面
  // res.json(['success',  "服务器收到一个Ajax post请求 用户名 ["+username+"] 密码 ["+password+"]"]);
  res.json({
    code: "success",
    info:
      "服务器收到一个Ajax post请求 用户名 [" +
      username +
      "] 密码 [" +
      password +
      "]"
  });
});
  
/* 头像上传处理 */
var upload = multer(globals.avatar);
router.get('/upload', function(req, res, next) {
  res.render('file',{ title:"头像上传",layout:"layout-default"});
});
router.post('/doUpload',upload.array('image'),function(req, res, next) {
    console.log(req.files[0]);  // 上传的文件信息
    if(undefined == req.files[0]){
        res.json(['failed', {msg:"没有选择要上传的文件！"}]);
        return -1;
    }
    var des_file = "./avatar/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
                res.json(['failed', {msg:err}]);
            }else{
                response = {
                    msg:'File uploaded successfully', 
                    filename:req.files[0].originalname,
                };
                res.json(['success', response]);
            }
        });
    });
});

/*登录模块*/
var loginDao = require('../model/loginDao'); // 登录模型
router.get('/login', function(req, res, next) {
    if(req.session.isLogin){
        res.locals.isLogin = req.session.isLogin;
    }
    res.render('login', { title: '登录',layout:"layout-default" });
});
router.get('/loginAction', function(req, res, next) {
    loginDao.login(req, res, next);
});



module.exports = router;
