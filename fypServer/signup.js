const express=require("express");
const router=express.Router();
var jwt = require('jsonwebtoken');
const User=require("./models/Users");


router.post("/", (req, res) => {

    var data = req.body; 
    var user = new User(data);
    user.save()

        .then((resolve) => {

            console.log("Resolve: ", resolve);

            var token=jwt.sign({userid:User._id},"shhhh");
            res.send(token);

        })

        .catch((err) => {

            console.log("Error: ", err);

            res.status(500);

            res.send("Something went wrong");

        });

});




module.exports=router;