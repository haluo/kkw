/**
 * Created by zhufeng on 15-2-4.
 * 用户
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signin', function(req, res) {
    res.render('users/signin');
});

router.post('/login', function(req, res,next) {
    var User=DB.get("User");
    var params=req.body;
    console.log(params);
    User.where(params,function(err,result){
        if(err){
            next(err);
        }else{
            if(result && result.length>0){
                req.session.user=result[0];
                res.redirect("/");
            }else{
                res.redirect("/users/signin");
            }
        }
    });
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect("/users/signin");
});


module.exports = router;
