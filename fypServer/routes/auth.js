const express = require("express");
const router = express.Router();
const auth = require('../controllers/auth');
const teacherModule = require('./teacher')
const studentModule = require("./student");
const fs=require('fs')
const path=require('path');
const multer = require('multer');

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{

        const pathFile=path.join(path.dirname(process.mainModule.filename),"public","uploads",file.originalname)
    
        fs.mkdirSync(pathFile, { recursive: true })
        cb(null,pathFile)
    },
    filename:(req,file,cb)=>{
        console.log(file)
          cb(null,Date.now()+file.originalname)
        
    }
})
var upload = multer({storage:fileStorage});

router.use('/login/teacher', teacherModule);
router.use('/student', studentModule);


router.post("/login", auth.teacherLoginController);

router.post("/signup", auth.teacherSignupController);


router.post("/signup/student",auth.studentSignupController);
router.post("/signup/studentVoice",upload.array('data',5),auth.saveVoiceController);
router.post("/login/student",auth.studentLoginController);
router.post("/login/studentVoiceAuth",upload.array('data',2),auth.studentLoginVoiceController);

module.exports = router;