/**
 * Created by zhufeng on 15-2-4.
 * 报警
 */
var express = require('express');
var router = express.Router();

router.get('/users', function(req, res, next) {
    res.render('alarm/users');
});

module.exports = router;