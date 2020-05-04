var express = require('express');
var session = require('express-session'); // session
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); // 记录访问日志
var cookieParser = require('cookie-parser'); // cookie
var bodyParser = require('body-parser');
var multer  = require('multer');// 上传文件
var index = require('./routes/index');

// 声明routes
var users = require('./routes/users');

var app = express();

// 上传文件
app.use(multer({ 
  dest: './avatar/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 模板引擎
app.engine('.html',require('ejs').__express);
app.set('view engine', 'html'); // ejs模板

// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 输出日志到目录
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
  res.render('error');
});

module.exports = app;
