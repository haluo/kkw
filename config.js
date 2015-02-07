/**
 * Created by zhufeng on 15-1-18.
 * App 配置信息
 */
var app = {
    appport: 8866,
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123',
    database: 'zkconf',
    logger_path: "./bin/logs/error.log",
    logger_level: 'debug'
};
global.cfg = app;

module.exports = app;