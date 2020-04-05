const express=require("express");
const router=express.Router();
var jwt = require('jsonwebtoken');
const Teacher=require("./models/Teachers");
const studentModule=require("./student")
const bcrypt=require('bcryptjs');
const teacherModule=require('./teacher')

router.use('/teacher',teacherModule);
router.use('/student', studentModule);
router.post("/",(req,res)=>{
   const email=req.body.email;
   const password=req.body.password;
   console.log(email)
    Teacher.findOne({email}).then(teacher=>{
        console.log(teacher)
        if(!teacher){
            return res.status(404).json({email:'Teacher not found'});
        }
        bcrypt.compare(password,teacher.password)
        .then(isMatch => {
            if(isMatch){
                var token=jwt.sign({teacherid:teacher._id},"shhhh");
                console.log(token);
                res.send(token);
            }
            else{
            
                return res.status(404).json({password:'Password Incorrect'});
            }
        })   
    })
     
    });
    module.exports=router;