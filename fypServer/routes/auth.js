const express = require("express");
const router = express.Router();
const auth = require('../controllers/auth');
const teacherModule = require('./teacher')
const studentModule = require("./student")
const path=require('path');
const multer = require('multer');
var upload = multer({ dest:path.join(path.dirname(process.mainModule.filename),'public','uploads') });

router.use('/login/teacher', teacherModule);
router.use('/student', studentModule);


router.post("/login", auth.teacherLoginController);

router.post("/signup", auth.teacherSignupController);


router.post("/signup/student",auth.studentSignupController);
router.post("/signup/studentVoice",upload.array('data',5),auth.saveVoiceController);
router.post("/login/student",auth.studentLoginController);
router.post("/login/studentVoiceAuth",upload.array('data',2),auth.studentLoginVoiceController);

module.exports = router;