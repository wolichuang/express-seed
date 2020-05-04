/**
 * 文章数据库操作类
 * @type {exports}
 */
var $util = require('../conf/util'); // 工具类
var logger = $util.log(); // 日志管理
var pool = $util.pool(); // 数据库链接池
var $sql = require('../map/msgSqlMapping'); // sql语句

module.exports = {
  // 查
  queryAll:function(req,res,next){
     pool.getConnection(function(err,connection){
         connection.query($sql.queryAll,function(err,result){
             if(err){
                logger.error(err);
                return;
             }
             // 第二个参数可以直接在jade中使用
             res.render('msg/list', {
                 result: result
             });
             //jsonWrite(res, result);
             connection.release();
         });
     });
  }

};
