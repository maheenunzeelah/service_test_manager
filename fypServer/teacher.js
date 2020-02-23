const express=require("express");
const router=express.Router();
var jwt = require('jsonwebtoken');
const Tests=require("./models/Tests");

router.post('/',(req,res)=>{
    var token=req.headers['authorization'];
    console.log(token);
    var testName=req.body.testName;
   console.log(testName);
    try{
        var decoded=jwt.verify(token,'shhhh');
        console.log(decoded);
        Tests.findOne({testName})
        .then(test=>{
            if(test)
            return res.status(400).json({test:'Test Name alreday exists'});
            else{
            const test= new Tests(testName);
            test.save()
             .then(resolve=>{
                 console.log(resolve);
                 res.send('Test Created');
             })
             .catch((err)=>{
                 res.send('Something went wrong')
             })
            }
        })
    }
    catch(err){
        console.log(err)
     res.status(401).send(err)
    }
})
module.exports=router;