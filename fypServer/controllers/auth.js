const jwt = require('jsonwebtoken');
const Teacher = require("../models/Teachers");
const Student = require("../models/Students");
const bcrypt = require('bcryptjs');
var ffmpeg = require('ffmpeg')
var amqp = require('amqplib/callback_api');
const minio = require('minio');
const fs = require('fs')



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






exports.studentSignupController = (req, res, next) => {

    studentData = req.body
    Student.findOne({ email: studentData.email })
        .then(student => {
            if (student) {
                return res.status(400).json({ email: 'Email alreday exists' });
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
                                return res.json({ token, id: student._id });
                            })

                    })
                })
            }

        })

        .catch((err) => {

            console.log("Error: ", err);

            res.status(500).send("Something went wrong");

        });

}



exports.saveVoiceController = (req, res) => {
    let files = req.files
    console.log(files)
    
    let bucketName = files[0].originalname
    console.log(bucketName)
    // const fileStream = fs.createReadStream(path)

    var minioClient = new minio.Client({
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        accessKey: 'MaheenUnzeelah',
        secretKey: 'Cryptography',

    });

    minioClient.bucketExists(bucketName, function (err, exists) {
        if (err) {
            return console.log("erere", err)
        }
        if (!exists) {
            //Make a bucket called europetrip.
            minioClient.makeBucket(bucketName, function (err) {
                if (err) return console.log(err)

                console.log('Bucket created successfully ')
            })
        }
       files.map(file=>{
        minioClient.fPutObject(bucketName, file.filename, file.path, function (err, etag) {
            if (err) return console.log(err)
            
        });
       
    })

    })
    console.log('Files uploaded successfully.')
    res.send('Student Registered')




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