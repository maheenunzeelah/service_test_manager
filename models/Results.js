const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new mongoose.Schema({
score:Number,    
studentID:{ type: Schema.Types.ObjectId, ref: 'Students' },
testID:{ type: Schema.Types.ObjectId, ref: 'Tests' }
});
    
var Results= mongoose.model("Results", resultSchema);


module.exports=Results;