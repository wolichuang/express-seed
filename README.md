# express4.0 起手架

nodejs的前端框架 主要构成 模板解析 路由控制 用户会话 CSRF保护 静态文件服务 错误控制器 日志处理 缓存。

## 是什么

express4.x 开发常用功能备忘录

## 功能点

1. 初始化项目
2. 初始化 全局变量配置
3. 初始化 模板引擎
4. 初始化 路由
5. 初始化 mysql 模块 
6. 初始化 日志 模块
7. 初始化 cookie 模块
8. 初始化 session 模块
9. 功能-文件上传 模块
10. 功能-mock 模块
11. 案例-用户增删改查

## 初始化项目


```js
npm install express -gd           # 依赖全局安装express
npm install express-generator     # 安装辅助工具 添加到命令行
express -e express4.0-starter     # 初始化express项目
cd express4.0-starter

yarn                              # 安装 
npm start                         # 启动

# 开发环境配置-自动启动
npm install node-dev
"scripts": {
    "start": "node-dev ./bin/www"
}
# 或者
npm install -g supervisor
"scripts": {
    "start": "supervisor ./bin/www"
}
```

## 初始化 全局变量配置

在 app.js 中引用

```javascript
 // 设置全局静态变量库
app.locals.globals = require('./config/globals');

// globals.js
module.exports = {
    avatar:{ 
        dest: '../avatar/',
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
        }
    },
    baseUrl:'http://127.0.0.1:3000/'
};
```

## 初始化 模板引擎

控制器得到用户请求后，从模型获取数据，调用模板引擎。

模板引擎以数据和页面模板为输入，生成 HTML 页面，然后返回给控制器，由控制器交回客户端。

修改 app.js

```js
var ejs = require('ejs'); 
app.engine('.html',ejs.__express);  
app.set('view engine', 'html');
```

### ejs 语法

```javascript
// ejs 语法
<% code %>：JavaScript 代码。
<%= code %>：显示替换过 HTML 特殊字符的内容。
<%- code %>：显示原始 HTML 内容。
<%- include layout %> 页面布局

// 模板
<%include commons/header.html%>
<%include commons/footer.html%>

<%= title %>

// 循环
 <% for(var i=0; i < users.length; i++)  {%>
    <tr>
        <td><%=users[i].id%></td></td>
    </tr>
<% } %>

// js-else
<% if(page =="addUser"){%>

<%} else {%><%}%>
```

## 初始化 路由

分别修改 app.js 和 创建 router/index.js 添加修改内容

```js
// app.js
var users = require('./routes/users');
app.use('/users', users);

// router.js
var express = require('express');
var router = express.Router();

var usersDao = require('../model/usersDao');
router.get('/', function(req, res, next) {
  usersDao.queryAll(req, res, function(data){
      res.render('users/list', {
          title:title,
          users: data
      });
  });
});

module.exports = router;
```

router 中常用的操作说明

1. 一种是利用res.render替换jade（ejs）模板处理view层显示
2. 一种是利用res.send发送数据请求直接显示到网页。
3. get 请求 req.query.username 获取参数。
4. post 请求 req.body.username 获取参数。
5. json 返回 res.json({'code':'success','info':data});
6. req(request)代表客户端的数据，是一个可读流;
7. res(response)代表服务端的数据，是一个可写流； 你可以拿到你想要的数据：
8. next 函数主要负责将控制权交给下一个中间件，如果当前中间件没有终结请求，并且next没有被调用，那么请求将被挂起，后边定义的中间件将得不到被执行的机会。next函数主要是用来确保所有注册的中间件被一个接一个的执行，那么我们就应该在所有的中间件中调用next函数，但有一个特例，如果我们定义的中间件终结了本次请求，那就不应该再调用next函数。

```js
// render 映射到 html 中
res.render('users/one',{title:title,user:user});
// 跳转页面
res.redirect('/users');
// json
res.json({ title: 'express4.0 json' }) 
// send
res.send('<===>some html');
// locals
res.locals.isLogin = req.session.isLogin;
// cookie
res.cookie('name', 'tobi', options);
// 取值
req.params.name  // 取值（/user/:name）
req.query.ctime // 取值 (?q=tobi+ferret)
req.param('name') // 取值 （?name=tobi 、/user/:name 、?q=tobi+ferret）
req.body.name // 取值 (post值)
res.redirect('http:// example. com'); 

// Q:Error: Can't set headers after they are sent.
// 不能发送headers因为已经发送过一次。在处理http请求时，服务器先发送请求头，然后才是请求内容。而一旦创建连接生成了一次请求头后，如果在尝试调用设置请求头的方法res.redirect() 等会报这个错误。
// return res.json({ success: true, message: '成功' }); 
// 利用return 在response之前 进行返回处理。

// get请求
router.get("/doAjax", function(req, res, next) {
    // req 接收请求
    var username = req.query.username;
    var password = req.query.password;
    // res 返回到页面
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
// post请求：
router.post("/doAjax", function(req, res, next) {
    // req 接收请求
    var username = req.body.username;
    var password = req.body.password;
    // res 返回到页面
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
```

## 初始化 mysql 模块 

创建 config/server.js 配置文件、 utils 链接数据库工具文件， 创建 models/user.js 模型查询数据库

链接数据库，如 mysql

```package.json
"mysql": "^2.15.0",
"mysql2": "^1.5.1",
```

```js
// utils
var mysql = require('mysql');
var $conf = require('../config/server'); // 数据库
var utils = {
    // 数据库链接
    pool: function () {
        function extend(target, source, flag) {
            for (var key in source) {
                if (source.hasOwnProperty(key))
                    flag ?
                        (target[key] = source[key]) :
                        (target[key] === void 0 && (target[key] = source[key]));
            }
            return target;
        }
        // 使用连接池，提升性能
        return mysql.createPool(extend({}, $conf.mysql));
    }
}

// models/user.js
var $utils = require('../utils'); // 工具类
var pool = $utils.pool(); // 数据库链接池
var $sql = require('./usersMapping'); // sql语句
pool.getConnection(function(err, connection) {
    connection.query($sql.queryAll, function(err, result) {
        if(result.length){
            callback(result);
        }else{
            result = void 0;
        }
        // jsonWrite(res, result);
        connection.release();
    });
});
```

## 初始化 日志 模块

1. log4j1.x 用于记录项目中出现的错误日志
2. morgan 用于记录访问日志

```package.json
"morgan": "~1.5.1"
"file-stream-rotator":"~0.0.6"
"log4js":"~1.0.0"
```

修改 app.js


```js
var logger = require('morgan'); // 记录访问日志
var fs = require('fs');
var fileStreamRotator = require('file-stream-rotator');
var logDir = path.join(__dirname, 'logs');
fs.existsSync(logDir) || fs.mkdirSync(logDir);
var accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDir, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: true
});
app.use(logger('combined', {stream: accessLogStream}));
```

使用 logger

```js
var $utils = require('../utils'); // 工具类
var logger = $util.logger(); // 日志管理
logger.info("this is log");//输出日志
```

## 初始化 cookie 模块

```package.json
"cookie-parser": "~1.4.3"
```
修改 app.js

```js
var cookieParser = require('cookie-parser'); // cookie配置
app.use(cookieParser('this is key')); // 设置cookies
```
测试 cookie

```js
// router
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
    res.send(req.cookies.name);  // 输出cookie值
});
```

## 初始化 session 模块

```package.json
"express-session": "^1.15.6"
```

修改 app.js

```js
import serverConfig from './config/global.js'
app.use(session({
  "resave": serverConfig.session.resave,
  "saveUninitialized": serverConfig.session.saveUninitialized,
  "secret": serverConfig.session.secret, // 建议使用 128 个字符的随机字符串
  "cookie": serverConfig.session.cookie
}));
```

测试 session

```js
req.session.count = req.session.count || 0; 
var sessionCount = req.session.count++;
```

## 功能-文件上传 模块

```package.json
"multer": "^1.2.0"
```

```js
// router.js
var multer  = require('multer');
var fs = require("fs");
var upload = multer({ 
    dest: './avator/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    }
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
```

## 功能-mock 模块

```js
"mockjs": "2.x"
```

创建 mock/index.js

```js

var Mock = require("mockjs");
var Random = Mock.Random;
var data = Mock.mock({
'results|10': [{
    'id|+1': 1,
    'username':'@name',
    'password':'1234',
    'sex':Random.integer(1,2),
    'age':/\d{2}/,
    'photo':'photo.jpg',
    'realname':"@cname()"
}]
});
console.log(JSON.stringify(data, null, 4));
```

## 案例：用户增删改查

包含文件：mock/usersMock.js 、model/usersDao.js 、model/usersMapping.js 、routes/users.js

github: https://github.com/wolichuang/express-seed

## 附件：package.json

```
{
  "name": "express4.0-learn",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node-dev ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.16.0",
    "co": "~4.6.0",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.0",
    "ejs": "~2.5.5",
    "express": "~4.14.1",
    "express-session": "^1.15.6",
    "file-stream-rotator": "^0.2.0",
    "mockjs": "^1.0.1-beta3",
    "morgan": "~1.7.0",
    "multer": "^1.2.0",
    "mysql": "^2.15.0",
    "mysql2": "^1.5.1",
    "node-dev": "^3.1.3",
    "serve-favicon": "~2.3.2",
    "log4js": "~1.0.0"
  }
}
```


