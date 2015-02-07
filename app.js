var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var montor = require('./routes/montor');
require("./config");
var userutil = require('./utils/userutil');
var contents = require('./utils/contents');

global.DB=require("./utils/dbutil.js").Instance();
DB.define({key:'User',name:'zk_user',fields:['id_','username','password','desc','type','tree_path','up_path']});//type 1 普通  9  管理员


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'tesla',resave: true, saveUninitialized:true}));
app.use(express.static(path.join(__dirname, 'public')));



//Session拦截控制
app.all("*",function(req,res,next){
    //对权限路径进行控制
    var _flag=false;
    var _isadmin=false;
    var _idadminurl=false;
    if(req.session.user==null){
        _flag = true;
    }
    if(req.url.indexOf("signin")>-1 ||req.url.indexOf("login")>-1 ){
        _flag = false;
    }
    res.locals.user=req.session.user;
    res.locals.activeTab="";
    if(_flag){
        res.redirect("/users/signin");
    }else{

        if( req.session.user!=null && userutil.getType(req,res)!=contents.ADMIN_TYPE && req.url.indexOf("admin")>-1){
            var err = new Error('没有权限');
            err.status = 403;
            res.render('error', {
                message: err.message,
                error: err
            });
        }else{
            next();
        }
    }
});



app.use('/', routes);
app.use('/users', users);
app.use('/montor', montor);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
