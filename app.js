const express = require("express")
const app = express();
const path = require("path");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const userModel = require("./models/userModel")
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);
require('dotenv').config()


io.on("connection", function(socket){
    socket.on("message",function(message){
        io.emit("message",message)
    })
})

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  

app.use("/",indexRouter);


server.listen(3000)