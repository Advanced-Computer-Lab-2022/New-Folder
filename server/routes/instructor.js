const express = require("express");
const router = express.Router();
const {
  registerInstructor,
  getInstructor,
  loginInstructor,
} = require("../controllers/instructorController");
const { protectInstructor } = require("../middleWare/authInstructorMiddleWare");
// import controllers
const {getMyCourses} = require("../controllers/instructor/myCourses");
const {createCourse} = require('../controllers/instructor/createCourse')

// import middlewares

// api routes

router.post("/createCourse", createCourse)

router.post("/", registerInstructor);
router.post("/login", loginInstructor);
router.get("/me", protectInstructor, getInstructor);

module.exports = router;
