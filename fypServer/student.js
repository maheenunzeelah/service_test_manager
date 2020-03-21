const express=require('express');
const router=express.Router();
// var jwt=require('jsonwebtoken');
var ffmpeg=require('ffmpeg')
var amqp = require('amqplib/callback_api');
const multer = require('multer');

var upload = multer({ dest: __dirname + '/public/uploads/' });

router.post('/',upload.single('data'),(req,res)=>{
    // try{
    //     var mssg=req.file;
        
    //      console.log(mssg)
         
    //     var process=new ffmpeg(mssg);
    //     process.then(function (audio){
    //         audio.fnExtractSoundToMP3(__dirname+'/file.mp3',function(error,file){
    //             if(!error)
    //             console.log('Audio file'+file);
                
    //         });
    //     },function(err){
    //         console.log('Error :'+ err);
    //     })
        
    // }
    // catch(e){
    //     console.log(e.code);
    //     console.log(e.msg);}
    
    const file = req.file
    console.log(file)
      res.send(file)

    
//      var mssg=req.body;
     
//      console.log(mssg)
//     amqp.connect('amqp://localhost', function(error0, connection) {
//         console.log("runningg")
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }

//         var queue = 'hello';
        

//         channel.assertQueue(queue, {
//             durable: false
//         });
//         channel.sendToQueue(queue, Buffer.from(mssg));

//         console.log(" [x] Sent %s", mssg);
//     });
//     setTimeout(function() {
//         connection.close();
        
        
//     }, 500);
    
// });
})
module.exports=router;