const mongoose=require('mongoose')
const Schema=mongoose.Schema


const  studentsInGroupSchema = new mongoose.Schema({
    group:{ type: Schema.Types.ObjectId, ref: 'Groups' },
    student:{ type: Schema.Types.ObjectId, ref: 'Students' },
});
    
var StudentsInGroup= mongoose.model("StudentsInGroup",studentsInGroupSchema);


module.exports=StudentsInGroup;