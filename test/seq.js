var Sequelize = require("sequelize");
var mysql = require("mysql");
var co = require("co");
var Mock = require("mockjs");
var Random = Mock.Random;
var sequelize = new Sequelize(
  "db_entry", // 数据库名
  "root", // 用户名
  "", // 用户密码
  {
    dialect: "mysql", // 数据库使用mysql
    host: "localhost", // 数据库服务器ip
    port: 3306, // 数据库服务器端口
    define: {
      // 字段以下划线（_）来分割（默认是驼峰命名风格）
      underscored: true
    }
  }
);
var User = sequelize.define(
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  "xxts_users",
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    username: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    sex: {
      type: Sequelize.INTEGER(2),
      allowNull: false
    },
    age: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    photo: {
      type: Sequelize.STRING(30),
      allowNull: true
    },
    realname: {
      type: Sequelize.STRING(30),
      allowNull: true
    }
  },
  {
    // 自定义表名
    freezeTableName: true,
    tableName: "xxts_users",

    // 是否需要增加createdAt、updatedAt、deletedAt字段
    timestamps: true

    // 不需要createdAt字段
    // 'createdAt': false,
    // 将updatedAt字段改个名
    //'updatedAt': 'utime'
    // 将deletedAt字段改名
    // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
    // 'deletedAt': 'dtime',
    // 'paranoid': true
  }
);
var data = Mock.mock({
  "list|4": [
    {
      "id|+1": 1,
      username: "@name",
      password: "1234",
      sex: Random.integer(1, 2),
      age: /\d{2}/,
      photo: "photo.jpg",
      realname: "@cname()"
    }
  ]
});
// mock
// var list = data.list;
// for (let index = 0; index < list.length; index++) {
//     co(function* () {
//         var json = list[index];
//         var user = User.build(json);
//         user = yield user.save();
//         // console.log(user.get({'plain': true}));
//     }).catch(function(e) {
//         console.log(e);
//     });
// }

// 增加
function user_add() {
  co(function*() {
    var user = yield User.create({
      username: "小明",
      password: "技术部",
      sex: 2,
      age: 32,
      photo: "photo.jpg",
      realname: "admin"
    });
    console.log(user.get({ plain: true }));
  }).catch(function(e) {
    console.log(e);
  });
}

// 修改
function user_update(){
    co(function*() {
        var user = yield User.update({
            username: "小白白"
        },{
            where:{
                id:1
            }
        });
        console.log("更新成功");
    }).catch(function(e) {
        console.log(e);
    });
}

// 删除
function user_destroy(){
    co(function*() {
        var user = yield User.destroy({
            where:{
                id:1
            }
        });
        console.log("删除成功");
    }).catch(function(e) {
        console.log(e);
    });
}

// 查询
function user_query(){
    co(function*() {
        var user = yield User.findAll().spread(function(item, created){
            console.log(item.get({ plain: true }));
        });
    }).catch(function(e) {
        console.log(e);
    });
}

user_query();
