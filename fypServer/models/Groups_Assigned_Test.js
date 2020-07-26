const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupAssignedTestSchema = new mongoose.Schema({
    group:{ type: Schema.Types.ObjectId, ref: 'Groups' },
    test:{ type: Schema.Types.ObjectId, ref: 'Tests' },
});
    
var GroupAssignedTest= mongoose.model("GroupAssignedTest", groupAssignedTestSchema);


module.exports=GroupAssignedTest;