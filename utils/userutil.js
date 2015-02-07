exports.getTree = function (req,res){
    var path = null;
    if(req.session.user!=null){
     path = req.session.user.tree_path;
    }
    if(path==null){
      res.redirect("/user/signin");
    }
    console.log("=========="+path);
    return path;
}

exports.getUp = function (req,res){
    var path = null;
    if(req.session.user!=null){
        path = req.session.user.up_path;
    }
    if(path==null){
        res.redirect("/user/signin");
    }
    return path;
}
exports.getDesc = function (req,res){
    var path = null;
    if(req.session.user!=null){
        path = req.session.user.desc;
    }
    if(path==null){
        res.redirect("/user/signin");
    }
    return path;
}

exports.getType = function (req,res){
    var type = null;
    if(req.session.user!=null){
        type = req.session.user.type;
    }
    if(type==null){
        res.redirect("/user/signin");
    }
    return type;
}