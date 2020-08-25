const jwt = require('jsonwebtoken');
const Tests = require("../models/Tests");
const Questions = require("../models/Question");
const Groups = require("../models/Groups");
const StudentsInGroup = require("../models/Students_In_Group");
const GroupsAssignedTests=require("../models/Groups_Assigned_Test")
const Students = require("../models/Students");
const is_Empty = require('../is_Empty');
let _ = require('lodash')
const mongoose = require('mongoose');
//groupTest
exports.groupTestController=(req,res)=>{
    const token=req.headers["authorization"];
    const id=req.params.id
    try{
        const decoded=jwt.verify(token,'shhhh')
        const group=StudentsInGroup.find({studentId:id})
        .select('-studentId -_id')
        .populate('groupId',' groupName ')
         .exec()
         .then(group=>{
             return tests(group)
           
         })
        function tests(group){
            
             const values=group.map(grp=>grp.groupId._id)
            const query={
                'groupId':{$in:values}
            }
            
             GroupsAssignedTests.find(query)
             .populate('testId groupId','testName groupName')
             .exec()
             .then(test=>{
               return res.send(test)
             }
             )
        
        }
        
    }
    catch(err){
        return res.status(401).send(err);
    }
}
exports.studentTestController=(req,res)=>{
    const token=req.headers["authorization"];
    const id=req.params.id
    try{
        const decoded=jwt.verify(token,'shhhh')
        GroupsAssignedTests.find({studentId:id})
        .select('-studentId -_id')
        .populate('testId',' testName -_id')
         .exec()
         .then(test=>{
             console.log(test)
             return res.send(test)
         })
         .catch(err=>{
            return res.send('Something went wrong')
         })
    }
    catch(err){
        return res.status(401).send(err);
    }
}