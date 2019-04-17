var Mock = require("mockjs");
var Random = Mock.Random;

function newUser(){
    var data = Mock.mock({
        'one|1': [{
           'id|+1': 1,
           'username':'@name',
           'password':'1234',
           'sex':Random.integer(1,2),
           'age':/\d{2}/,
           'photo':'photo.jpg',
           'realname':"@cname()"
        }]
    });
    return data;
}
module.exports = {
    newUser:newUser
}

// console.log(JSON.stringify(data, null, 4));