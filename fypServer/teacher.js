const express=require("express");
const router=express.Router();
var jwt = require('jsonwebtoken');
const Tests=require("./models/Tests");
const Questions=require("./models/Question");
const Validator=require('validator')

router.post('/',(req,res)=>{
    var token =req.headers.authorization
    console.log(token);
    var testName=req.body.testName;
    var data=req.body;
   console.log(testName);
    try{
        var decoded=jwt.verify(token,'shhhh');
        data.teacher=decoded.teacherid;
            Tests.findOne({testName})
        .then(test=>{
            if(test)
            return res.status(400).json({test:'Test Name alreday exists'});
            else{
             if(testName==undefined)
             res.send("Enter Test name")
             else{

            const test= new Tests(data);
            test.save()
             .then(resolve=>{
                 console.log(resolve);
                 res.send(resolve);

             })
             .catch((err)=>{
                 res.send('Something went wrong')
             })
            }}
        })
    }
    catch(err){
        console.log(err)
     res.status(401).send(err)
    }
})

router.post('/addQues',(req,res)=>{
    var token =req.headers.authorization
    console.log(token);
    var question=req.body.question;
    var data=req.body;
   console.log(data);
    try{
        var decoded=jwt.verify(token,'shhhh');
        console.log(decoded);
        Questions.findOne({question})
        .then(quest=>{
            if(quest)
            return res.status(400).json({ques:'Question alreday exists'});
            else{
            if(question==undefined){
                res.send("Enter Question")
            }
            else{    
            const question= new Questions(data);
            question.save()
             .then(resolve=>{
                 console.log(resolve);
                 res.send('Question saved');
             })
             .catch((err)=>{
                 res.send('Something went wrong')
             })
            }
        }
        })
    }
    catch(err){
        console.log(err)
     res.status(401).send(err)
    }
})
router.get('/tests',(req,res)=>{
    var token=req.headers['authorization'];
    try {
        var decoded = jwt.verify(token, 'shhhh');
        Tests.find((error,response)=>{
           if(error){
               res.status(500);
               res.send(error);
               return
           }
        console.log(response);
       res.send(response);
        })
       
      } 
    catch(err) {
        res.status(401).send(err);
      }
    
    
})
router.get('/readQues',(req,res)=>{
    var token=req.headers['authorization'];
    try {
        var decoded = jwt.verify(token, 'shhhh');
        Questions.find((error,response)=>{
           if(error){
               res.status(500);
               res.send(error);
               return
           }
        console.log(response);
       res.send(response);
        })
       
      } 
    catch(err) {
        res.status(401).send(err);
      }
    
    
})
module.exports=router;