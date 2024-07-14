const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/chitchit');


const userSchema = mongoose.Schema({
    username: String,
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password: String,
    profilepicture:{
        type:String,
        trim:true,
    },

},
);

module.exports = mongoose.model("user", userSchema);