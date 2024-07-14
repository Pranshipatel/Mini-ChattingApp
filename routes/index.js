const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const isLoggedIn = require("../middlewares/isLoggedIn");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.get("/chat",(req,res)=>{
    res.render("chat");
})

router.get("/",(req,res)=>{
    res.render("login");
})

router.get("/register",(req,res)=>{
    res.render("register");
})

router.get("/name",(req,res)=>{
    res.render("name");
})

router.post('/create', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.redirect('/login');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ email }, process.env.JWT_KEY);
        res.cookie('token', token);
        res.redirect("/name");
    } catch (err) {
        console.error('Error in user creation:', err);
        res.send(err.message);
    }
});

router.post("/login", async(req,res)=>{
 try{
    let {password, email}= req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.redirect("/register");
    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            return res.redirect("/chat");
        }
        else{
            res.send(err.message);
        }
    });
    
 }
 catch(err){
    res.send(err.message)
 }
})

router.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
})


module.exports = router;