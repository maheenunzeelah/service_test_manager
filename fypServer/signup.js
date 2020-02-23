const express=require("express");
const router=express.Router();
var jwt = require('jsonwebtoken');
const Teacher=require("./models/Teachers");
const bcrypt=require('bcryptjs');

router.post("/", (req, res) => {

    var data = req.body; 
     Teacher.findOne({email:data.email})
        .then(teacher=>{
          if(teacher){
              return res.status(400).json({email:'Email alreday exists'});
          }
          else{
              const teacher = new Teacher(data);
              bcrypt.genSalt(10,(err,salt)=>{
                  bcrypt.hash(teacher.password,salt,(err,hash)=>{
                      if(err) throw err;
                      teacher.password=hash;
                      teacher.save()
                       .then(teacher=>{
                        var token=jwt.sign({teacherid:teacher._id},"shhhh");
                        console.log(token);
                        res.send(token);
                       })
                  })
              })
          }
          
        })

        .catch((err) => {

            console.log("Error: ", err);

            res.status(500);

            res.send("Something went wrong");

        });

});




module.exports=router;