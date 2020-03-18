const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quesSchema = new mongoose.Schema({
question:String,
answer:String,
corr:[String],
answer1:String,
answer2:String,
answer3:String,
type:String,
test:{ type: Schema.Types.ObjectId, ref: 'Tests' }
});
    
var Questions= mongoose.model("Questions", quesSchema);


module.exports=Questions;