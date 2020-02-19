const express=require("express");
const router=express.Router();
var jwt = require('jsonwebtoken');
const Teacher=require("./models/Teachers");


router.post("/", (req, res) => {

    var data = req.body; 
    var teacher= new Teacher(data);
    teacher.save()

        .then((resolve) => {

            console.log("Resolve: ", resolve);

            var token=jwt.sign({teacherid:Teacher._id},"shhhh");
            res.send(token);

        })

        .catch((err) => {

            console.log("Error: ", err);

            res.status(500);

            res.send("Something went wrong");

        });

});




module.exports=router;