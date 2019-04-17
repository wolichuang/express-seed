/**
 * 登录模型类
 * @type {exports}
 */
var $utils = require('../utils'); // 工具类
var logger = $utils.logger(); // 日志管理
var pool = $utils.pool(); // 数据库链接池
var $sql = require('./loginMapping'); // sql语句
module.exports = {
    login: function (req, res, next) {
        pool.getConnection(function(err,connection){
            var username = req.query.username; //var username = req.body.username;
            var password = $utils.hexPwd(req.query.password); // 加密入库 非明文
            connection.query($sql.query,[username,password],function(err,result){
                if(err){
                    logger.error("login",err);
                    return;
                }
                if(result.length){
                    req.session.isLogin = username; // put session
                    //res.cookie('userId', username, {maxAge: 60 * 1000}); // put cookie
                    result = {
                        code: 1,
                        msg:'登录成功'
                    };
                }else{
                     result = {
                        code: 0,
                        msg:'登录失败'
                    };
                }
                $utils.jsonWrite(res, result);
                connection.release();
            });
        });
    }
};