const mongoose = require('mongoose');


const quesSchema = new mongoose.Schema({
question:String,
answer:String,
type:String
});
    
var Questions= mongoose.model("Questions", quesSchema);


module.exports=Questions;