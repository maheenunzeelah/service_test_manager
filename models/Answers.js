const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({

answer:String,
corrAns:String,

});
    
var Answers= mongoose.model("Answers", answerSchema);