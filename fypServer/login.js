const express=require("express");
const router=express.Router();
var jwt = require('jsonwebtoken');
const Teacher=require("./models/Teachers");


router.post("/",(req,res)=>{
    var data=req.body;
   console.log(data);

    Teacher.find(data,(error,response)=>{
        if(error){
            res.status(500);
            res.send(error);
            return;
        }
        // console.log(response);
        if(response.length){
            var token=jwt.sign({teacherid:response[0]._id},"shhhh");
            res.send(token);
        }
        else{
            res.send("Teacher not found")
        }
        })
     
    });
    module.exports=router;