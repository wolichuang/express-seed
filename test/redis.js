var redis = require('redis');//引入redis

var redisClient = redis.createClient("6379","127.0.0.1");
var password = "king";
redisClient.auth(password, function (err){
    if(err) throw err;
    redisClient.set("name", "test2", redis.print);

});
//redisClient.set("king", "xxx", redis.print);
//    redisClient.hset("hash king", "king 1", "some value", redis.print);
//    redisClient.hset(["hash king", "king 2", "some other value"], redis.print);
//    redisClient.hkeys("hash king", function (err, replies) {
//        console.log(replies.length + " replies:");
//        replies.forEach(function (reply, i) {
//            console.log("    " + i + ": " + reply);
//        });
//        redisClient.quit();
//    });
exports.redisClient = redisClient;