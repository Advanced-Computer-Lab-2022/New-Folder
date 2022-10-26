const express = require("express");
const router = express.Router();
const {
  registerInstructor,
  getInstructor,
  loginInstructor,
} = require("../controllers/instructorController");
const { protectInstructor } = require("../middleWare/authInstructorMiddleWare");
// import controllers
<<<<<<< HEAD
const {getMyCourses} = require("../controllers/instructor/myCourses");
const {createCourse} = require('../controllers/instructor/createCourse')
=======

>>>>>>> Testing
// import middlewares

// api routes

<<<<<<< HEAD
router.post("/createCourse", createCourse)

=======
router.post("/", registerInstructor);
router.post("/login", loginInstructor);
router.get("/me", protectInstructor, getInstructor);
>>>>>>> Testing

module.exports = router;
