const express=require('express');
const router=express.Router();
// var jwt=require('jsonwebtoken');

var amqp = require('amqplib/callback_api');
router.post('/',(req,res)=>{
     var mssg=req.body;
     mssg=mssg.toString();
     console.log(mssg)
    amqp.connect('amqp://localhost', function(error0, connection) {
        console.log("runningg")
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(mssg));

        console.log(" [x] Sent %s", mssg);
    });
    setTimeout(function() {
        connection.close();
        
        
    }, 500);
    
});
})
module.exports=router;