const jwt = require('jsonwebtoken');
const Teacher = require("../models/Teachers");
const Student = require("../models/Students");
const bcrypt = require('bcryptjs');
var ffmpeg=require('ffmpeg')
var amqp = require('amqplib/callback_api');

const path=require('path')



exports.teacherLoginController = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    Teacher.findOne({ email }).then(teacher => {
        console.log(teacher)
        if (!teacher) {
            return res.status(404).json({ email: 'Teacher not found' });
        }
        bcrypt.compare(password, teacher.password)
            .then(isMatch => {
                if (isMatch) {
                    var token = jwt.sign({ teacherid: teacher._id }, "shhhh");
                    console.log(token);
                    res.send(token);
                }
                else {

                    return res.status(404).json({ password: 'Password Incorrect' });
                }
            })
    })
}

exports.teacherSignupController = (req, res) => {

    var data = req.body;
    Teacher.findOne({ email: data.email })
        .then(teacher => {
            if (teacher) {
                return res.status(400).json({ email: 'Email alreday exists' });
            }
            else {
                const teacher = new Teacher(data);
                console.log(teacher._id)
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(teacher.password, salt, (err, hash) => {
                        if (err) throw err;
                        teacher.password = hash;
                        teacher.save()
                            .then(teacher => {
                                var token = jwt.sign({ teacherid: teacher._id }, "shhhh");
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

}






exports.studentSignupController = (req, res,next) => {

    const studentData= req.body.studentData;
    file=req.file
    console.log(req.body.msg)
    res.locals.file=file
    console.log(file)
    Student.findOne({ email: studentData.email })
        .then(student => {
            if (student) {
                // return res.status(400).json({ email: 'Email alreday exists' });
            }
            else {
                const student = new Student(studentData);
                console.log(student)
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(student.password, salt, (err, hash) => {
                        if (err) throw err;
                        student.password = hash;
                        student.save()
                            .then(student => {
                                var token = jwt.sign({ studentid: student._id }, "shhhh");
                                console.log(token);
                                res.locals.token=token
                                return next(); 
                            })
                           
                    })
                })
            }
          
        })

        .catch((err) => {

            console.log("Error: ", err);

            // res.status(500);

            // res.send("Something went wrong");

        });
       
}

   

exports.saveVoiceController=(req,res)=>{
    let file = 
    
    console.log(typeof(file))
    // file=file.toString();
    console.log(file)
    
   
      res.send(res.locals.token)

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
//         channel.sendToQueue(queue, Buffer.from(JSON.stringify(file)));

//         console.log(" [x] Sent %s", file);
//     });
//     setTimeout(function() {
//         connection.close();
        
        
//     }, 500);
    
// });
}