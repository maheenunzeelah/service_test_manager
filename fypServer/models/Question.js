const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quesSchema = new mongoose.Schema({
question:String,
answer:String,
corr:[String],
answers:[{}],
type:String,
test:{ type: Schema.Types.ObjectId, ref: 'Tests' },
created_at: {type: Date, default: Date.now},
updated_at: {type: Date, default: Date.now}
});
    
var Questions= mongoose.model("Questions", quesSchema);


module.exports=Questions;