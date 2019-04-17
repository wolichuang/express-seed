/*mongod.exe --dbpath=d:\databases\mongodb\data*/
var $utils = require('../config/utils'); // 工具类
var logger = $utils.logger(); // 日志管理
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var foo = {
	title:String,
	content:String
}
var WorkSchema = new Schema(foo);
var WorkModel = mongoose.model('foo',WorkSchema); // 表明 foo
WorkModel.find(function(err,doc){
	if(err){ 
		console.log(err);
    }else{
    	if(doc.length){
    	   console.log(doc);
    	}
    }
}).sort({'_id':-1});