// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO tab_user(id, name, age) VALUES(0,?,?)',
    update:'update tab_user set name=?, age=? where id=?',
    delete: 'delete from tab_user where id=?',
    queryById: 'select * from tab_user where id=?',
    queryAll: 'select * from tab_user'
};

module.exports = user;