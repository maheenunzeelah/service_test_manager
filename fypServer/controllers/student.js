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
       StudentsInGroup.find({studentId:id})
        .distinct('groupId')
        .then(grp=>{
            return tests(grp)
        }

        )
        
         .catch(err=>{
            return res.send('Something went wrong')
         })
         
        function tests(group){
            

           const query={
               'groupId':{$in:group}
           }
           
            GroupsAssignedTests.find(query)
            .select('-_id')
            .populate('testId groupId','testName groupName')
            .exec()
            .then(test=>{
                let arr=[]
                test.map(tes=>{
                    var arr2=arr.filter((v,i)=>{

                        console.log(v,v.groupId.groupName,tes.groupId.groupName)
                      return  v.groupId.groupName===tes.groupId.groupName
                    })
                    if(arr2.length){
                       var arr2Index=arr.indexOf(arr2[0])
                    //    console.log(arr2)
                    }
                    else{
                        arr.push(tes)
                    }
                })
                console.log(arr)
                
            //  return res.send(test)
            }
            )
       
       }
    }
    catch(err){
        return res.status(401).send(err);
    }
}