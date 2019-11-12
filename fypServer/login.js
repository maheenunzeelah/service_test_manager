const express=require("express");
const router=express.Router();
var jwt = require('jsonwebtoken');
const User=require("./models/Users");


router.post("/",(req,res)=>{
    var data=req.body;
   console.log(data);

    User.find(data,(error,response)=>{
        if(error){
            res.status(500);
            res.send(error);
            return;
        }
        // console.log(response);
        if(response.length){
            var token=jwt.sign({userid:response[0]._id},"shhhh");
            res.send(token);
        }
        else{
            res.send("user not found")
        }
        })
     
    });
    module.exports=router;