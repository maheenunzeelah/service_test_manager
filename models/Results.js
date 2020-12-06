const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new mongoose.Schema({
score:Number,    
perct:Number,
answers:[{answer:Boolean, ques:String}]  ,
corrAns:[String],
created_at: {type: String},
studentid:{ type: Schema.Types.ObjectId, ref: 'Students' },
test:{ type: Schema.Types.ObjectId, ref: 'Tests' }
});
    
var Results= mongoose.model("Results", resultSchema);


module.exports=Results;