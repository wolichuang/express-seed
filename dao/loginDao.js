/**
 * 登录模型类
 * @type {exports}
 */

var $util = require('../conf/util'); // 工具类
var logger = $util.log(); // 日志管理
var pool = $util.pool(); // 数据库链接池
var $sql = require('../map/loginSqlMapping'); // sql语句

module.exports = {
    login: function (req, res, next) {
        pool.getConnection(function(err,connection){
            var username = req.body.username;
            var password = $util.hexPwd(req.body.password); // 加密入库 非明文
            //console.log(password);
            //console.log(req.session);
            connection.query($sql.query,[username,password],function(err,result){
                if(err){
                    logger.error("login",err);
                    return;
                }
                if(result.length){
                    res.cookie('userId', username, {maxAge: 60 * 1000}); // put cookie
                    result = {
                        code: 200,
                        msg:'登录成功'
                    };
                }else{
                    result = void 0;
                }
                // 第二个参数可以直接在jade中使用
                $util.jsonWrite(res, result);
                connection.release();
            });
        });
    }
};