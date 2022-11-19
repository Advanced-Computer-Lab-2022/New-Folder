const express = require("express");
const router = express.Router();
// import controllers
const {
  getMyCourses,
} = require("../controllers/instructor/getMyCourses.controller");
const {
  createCourse,
} = require("../controllers/instructor/createCourse.controller");
const { authInstructor } = require("../middlewares/authUserMiddleware");
// import middlewares

// api routes

router.post("/createCourse", authInstructor, createCourse);
router.get("/myCourses", authInstructor, getMyCourses);

module.exports = router;
