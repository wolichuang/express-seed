/**
 * 用户数据库操作类
 * @type {exports}
 */
var $utils = require('../utils'); // 工具类
var logger = $utils.logger(); // 日志管理
var pool = $utils.pool(); // 数据库链接池
var $sql = require('./usersMapping'); // sql语句
var title = "用户管理";

function queryAll(req,res,callback){
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
}

function addUser(req,res,callback){
    pool.getConnection(function(err, connection) {
        var param = req.body;
        // 建立连接，向表中插入值
        connection.query($sql.insertUser, [param.username,$utils.hexPwd(param.password),param.realname], function(err, result) {
            // 写日志
            if(result) {
                result = {
                    code: 200,
                    msg:'增加成功'
                };
            }else{
                result = void 0;
            }
            // 以json形式，把操作结果返回给前台页面
            // $utils.jsonWrite(res, result);
            callback(result);
            // 释放连接 
            connection.release();
        });
    });
}

function queryById(req,res,callback){
    var id = +req.params.id; // 为了拼凑正确的sql语句，这里要转下整数
    pool.getConnection(function(err, connection) {
        connection.query($sql.queryById, id, function(err, result) {
            // 以json形式，把操作结果返回给前台页面
            // $utils.jsonWrite(res, result);
            callback(result[0]);
            connection.release();
        });
    });
}

function updateUser(req,res,callback){
    var param = req.body;
    if(param.id == null) {
        $utils.jsonWrite(res, undefined);
        return;
    }
    pool.getConnection(function(err, connection) {
        connection.query($sql.updateUser, [param.username, $utils.hexPwd(param.password), param.realname,param.id], function(err, result) {
            if(result.affectedRows) {
                result = {
                    code: 200,
                    msg:'修改成功'
                };
            } else {
                result = void 0;
            }
            callback(result);
            // 以json形式，把操作结果返回给前台页面
            // jsonWrite(res, result);
            // 释放连接
            connection.release();
        });
    });
}

function deleteById(req,res,callback){
    var id = +req.params.id; // 为了拼凑正确的sql语句，这里要转下整数
    pool.getConnection(function(err, connection) {
        connection.query($sql.deleteById, id, function(err, result) {
            // 以json形式，把操作结果返回给前台页面
            // $utils.jsonWrite(res, result);
            if(result.affectedRows > 0) {
                result = {
                    code: 200,
                    msg:'删除成功'
                };
            } else {
                result = void 0;
            }

            callback(result);
            connection.release();
        });
    });
}

module.exports = {
    queryAll:queryAll,
    // 增
    add: addUser,
    // 查询Id
    queryById: queryById,
    // 修改
    update: updateUser,
    // 删除Id
    delete: deleteById
};