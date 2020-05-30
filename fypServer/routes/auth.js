const express = require("express");
const router = express.Router();
const auth = require('../controllers/auth');
const teacherModule = require('./teacher')
const studentModule = require("./student")

router.use('/login/teacher', teacherModule);
// router.use('/student', studentModule);


router.post("/login", auth.teacherLoginController);

router.post("/signup", auth.teacherSignupController);

router.post("/student",auth.studentSignupController);


module.exports = router;