/**
 * log4js 日志输出配置文件
 * @type {exports}
 */
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' }, {
            type: 'dateFile',
            filename: '../logs/error.log',
            pattern: "_yyyy-MM-dd",
            maxLogSize: 1024,
            alwaysIncludePattern: false,
            backups: 4,
            category: 'logger'
        }
    ],
    replaceConsole: true
});
var logger = log4js.getLogger('logger');
logger.info("this is log");
// module.exports = log4js.getLogger('logger');