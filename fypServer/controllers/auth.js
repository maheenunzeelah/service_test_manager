const jwt = require('jsonwebtoken');
const Teacher = require("../models/Teachers");
const bcrypt = require('bcryptjs');


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

exports.studentSignupController = (req, res) => {

    var data = req.body;
    Student.findOne({ email: data.email })
        .then(student => {
            if (student) {
                return res.status(400).json({ email: 'Email alreday exists' });
            }
            else {
                const student = new Student(data);
                console.log(student._id)
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(student.password, salt, (err, hash) => {
                        if (err) throw err;
                        student.password = hash;
                        student.save()
                            .then(teacher => {
                                var token = jwt.sign({ studentid: student._id }, "shhhh");
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