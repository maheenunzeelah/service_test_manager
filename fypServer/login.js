const express=require("express");
const router=express.Router();
var jwt = require('jsonwebtoken');
const Teacher=require("./models/Teachers");
const bcrypt=require('bcryptjs');

router.post("/",(req,res)=>{
   const email=req.body.email;
   const password=req.body.password;
   console.log(email)
    Teacher.findOne({email}).then(teacher=>{
        console.log(teacher)
        if(!teacher){
            return res.status(404).json({email:'Teacher not found'});
        }
        if(password===teacher.password){

            var token=jwt.sign({teacherid:teacher._id},"shhhh");
            console.log(token);
            res.send(token);
        }
        else{
            
            return res.status(404).json({password:'Password Incorrect'});
        }
    })
     
    });
    module.exports=router;