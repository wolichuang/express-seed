/**
 * 用户数据库操作类
 * @type {exports}
 */
var $util = require('../conf/util'); // 工具类
var logger = $util.log(); // 日志管理
var pool = $util.pool(); // 数据库链接池

var $sql = require('../map/userSqlMapping'); // sql语句

module.exports = {
    // 增
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            // 建立连接，向表中插入值
            connection.query($sql.insert, [param.name, param.age], function(err, result) {
                // 写日志
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };    
                }else{
                    result = void 0;
                }
                // 表单提交
                res.redirect('/v/users/');

                // ajax提交
                // 以json形式，把操作结果返回给前台页面
                // jsonWrite(res, result);

                // 释放连接 
                connection.release();
            });
        });
    },

    // 删
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query($sql.delete, id, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                // 表单提交
                res.redirect('/v/users/');

                // ajax提交
                // 以json形式，把操作结果返回给前台页面
                // jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    },

    // 改
    queryById: function (req, res, next) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                res.render('users/update', {
                    result: result
                });
                //jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.name == null || param.age == null || param.id == null) {
            jsonWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
//                    res.render('suc', {
//                        result: result
//                    });
                    result = {
                        code: 200,
                        msg:'修改成功'
                    };
                } else {
                    result = void 0;
                }
                // 表单提交
                res.redirect('/v/users/');

                // ajax提交
                // 以json形式，把操作结果返回给前台页面
                // jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });

    },

    // 查
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                // 第二个参数可以直接在jade中使用
                res.render('users/list', {
                    result: result
                });
                //jsonWrite(res, result);
                connection.release();
            });
        });
    }
    
};
