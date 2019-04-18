var express = require('express');
var session = require('express-session'); // session配置
var path = require('path');
var favicon = require('serve-favicon');
var ejs = require('ejs'); // 模板配置
var expressLayouts = require('express-ejs-layouts');
var logger = require('morgan'); // 记录访问日志
var cookieParser = require('cookie-parser'); // cookie配置
var bodyParser = require('body-parser'); // 表单转化
var serverConfig = require('./config/server'); // 配置文件
// 路由
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
// 设置模板
app.engine('.html',ejs.__express); 
app.set('view engine', 'html');
app.use(expressLayouts);
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('this is key')); // 设置cookies
// 设置session
app.use(session({
  "resave": serverConfig.session.resave,
  "saveUninitialized": serverConfig.session.saveUninitialized,
  "secret": serverConfig.session.secret, // 建议使用 128 个字符的随机字符串
  "cookie": serverConfig.session.cookie
}));
app.use(express.static(path.join(__dirname, 'public')));
// 定义日志
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

// 定义路由
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'错误页面'});
});


app.locals.globals = require('./config/globals'); // 设置全局静态变量库

module.exports = app;
