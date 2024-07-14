const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
 
let isloggedIn = async (req,res,next) =>{
    try{
    if(res.cookies.token){
    const decoded = jwt.verify(res.cookies.token , process.env.JWT_KEY);
    const user = await userModel.findOne({email : decoded.email});
    if(user){
        req.user = user;
        next();
    }
    else{
        res.redirect("/")
    }
    }
    else{
        res.send("nothing");
    }
    }
    catch(err){
        res.send(err.message);
    }

}

module.exports = isloggedIn