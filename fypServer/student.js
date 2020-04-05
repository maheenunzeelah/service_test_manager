const express=require('express');
const router=express.Router();
// var jwt=require('jsonwebtoken');
var ffmpeg=require('ffmpeg')
var amqp = require('amqplib/callback_api');
const multer = require('multer');

var upload = multer({ dest: __dirname + '/public/uploads/' });

router.post('/',upload.single('data'),(req,res)=>{
    let file = req.file;
    console.log(typeof(file))
    // file=file.toString();
    console.log(file)
    
   
      res.send(file)

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
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(file)));

        console.log(" [x] Sent %s", file);
    });
    setTimeout(function() {
        connection.close();
        
        
    }, 500);
    
});
})
// try{
      
         
//     var process=new ffmpeg( __dirname + '/public/uploads/'+'b45e28a2da0cb1a76e3b779fc0f74b78');
//     console.log(process)
//     process.then(function (audio){
//         audio.fnExtractSoundToMP3(__dirname+'/public/uploads/'+'/file.mp3',function(error,file){
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


module.exports=router;