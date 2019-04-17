var Mock = require("mockjs");

var Random = Mock.Random;

var data = Mock.mock({
    'list|4': [{
       'id|+1': 1,
       'number|1-10': 7,
       // 英文姓名
       // 'name' :'@name',
       // // 颜色
       // 'color': '@color',
       // // 英文标题
       // 'title': '@title',
       // // 链接
       // 'url': '@url("http")',
       // // 邮箱
       // 'email': '@email',
       // // 图片
       // 'image': Random.image('200x200', '#50B347', '#FFF', 'Mock.js'),
       // // 时间
       // 'date': '@date("yyyy-MM-dd HH:mm:ss")',
       // 'date2': '@dateTime',
       // // 汉字
       // 'ctitle': '@ctitle(8)',
       // // 汉字姓名
       // 'canme': '@cname()',
       // // 地址
       // 'cadd': '@province' + '@city' + '@county',
       // // 手机号
       // 'phone': /^1[385][1-9]\d{8}/

    }]
});
console.log(JSON.stringify(data, null, 4));