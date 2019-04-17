// 配置
module.exports = {
    avatar:{ 
        dest: '../avatar/',
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
        }
    },
    baseUrl:'http://127.0.0.1:3000/'
};
