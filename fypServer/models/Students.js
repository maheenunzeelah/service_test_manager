const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({

firstName: String,
lastName:String,
email: String,
password: String,
role: String

});

var Student= mongoose.model("Student", studentSchema);


module.exports=Student;