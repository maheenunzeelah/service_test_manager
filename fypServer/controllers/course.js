const jwt = require('jsonwebtoken');
const Tests = require("../models/Tests");
const Questions = require("../models/Question");

exports.getCourseList = (req, res) => {
    var token = req.headers['authorization'];
    let course;
    let quesType;
    try {
        var decoded = jwt.verify(token, 'shhhh');
        var query = { teacher: decoded.teacherid };
        Tests.find({ teacher: decoded.teacherid }).distinct('course', (err, cour) => {
            Questions.find().distinct('type',(err,type)=>{
                course=cour
                quesType=type
                res.send({course,quesType})
            })
           
        })
       
        
       
    }
    catch (err) {
        console.log(err)
    }
}