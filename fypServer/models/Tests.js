const mongoose = require('mongoose');


const testSchema = new mongoose.Schema({

testName:String,



});

var Tests= mongoose.model("Tests", testSchema);


module.exports=Tests;