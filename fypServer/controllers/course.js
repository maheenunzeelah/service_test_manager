const jwt = require('jsonwebtoken');
const Tests = require("../models/Tests");

exports.getCourseList = (req, res) => {
    var token = req.headers['authorization'];
    try {
        var decoded = jwt.verify(token, 'shhhh');
        var query = { teacher: decoded.teacherid };
        Tests.find({ teacher: decoded.teacherid }).distinct('course', (err, cour) => {
            res.send(cour)
        })
    }
    catch (err) {
        console.log(err)
    }
}