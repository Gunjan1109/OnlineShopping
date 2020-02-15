const Token = require("../models/token")
module.exports = function(req, res, next){
    var token = req.headers["Authentication"];
    if(!token)
    return res.send({message:'no token provided'});

    token = await Token.findById(token)

    if(!token)
    return res.send({message:'Invalid Token'});

    //set here so next functions can access the userid by calling
    //req.userid

    res.send('Message:Access Denied');
}