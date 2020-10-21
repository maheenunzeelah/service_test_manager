import { model } from 'mongoose';

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const settingsSchema=new Schema({
    groupAssignedTestId:{type: Schema.Types.ObjectId, ref: 'GroupAssignedTest'},
    timeLimit:Number,
    introduction:String,
    available: Boolean,
    attempts:Number
})

module.exports=mongoose.model("Settings",settingsSchema);