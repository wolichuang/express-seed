/**
 * Created by lichuang on 17-2-9.
 */
var mysql = require('mysql');
var client = mysql.createConnection({'host':'127.0.0.1','port':3306,'user':'root','password':'','database':'test'});
client.query('select * from tab_user',function(error,results){
    if(error){
        console.log("error",error);
        return;
    }
    console.log(results);
    client.end();
});
exports.client = client;