/**
 * Created by lichuang on 17-2-6.
 * 文章 sql语句
 */
var msg = {
    insert:'INSERT INTO tab_msg(title,brief,link,image,status,ctime,mtime) VALUES(?,?,?,?,?,?,?)',
    update:'update tab_msg set title=?, brief=? where id=?',
    delete: 'delete from tab_msg where id=?',
    queryById: 'select * from tab_msg where id=?',
    queryAll: 'select * from tab_msg'
};
module.exports = msg;