const jwt = require('jsonwebtoken');
const Tests = require("../models/Tests");
const Questions = require("../models/Question");
const Groups = require("../models/Groups");
const StudentsInGroup = require("../models/Students_In_Group");
const GroupsAssignedTests=require("../models/Groups_Assigned_Test")
const Students = require("../models/Students");
const is_Empty = require('../is_Empty');

//groupTest
exports.groupTestController=(req,res)=>{
    const token=req.headers["authorization"]
    try{
        const decoded=jwt.verify(token,'shhhh')
    }
    catch(err){

    }
}