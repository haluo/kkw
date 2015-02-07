/**
 * Created by zhufeng on 15-2-4.
 * 监控
 */
var express = require('express');
var router = express.Router();

router.get('/performance', function(req, res, next) {
    res.render('montor/performance');
});
router.get('/nginx', function(req, res, next) {
    res.render('montor/nginx');
});
router.get('/scs', function(req, res, next) {
    res.render('montor/scs');
});

module.exports = router;