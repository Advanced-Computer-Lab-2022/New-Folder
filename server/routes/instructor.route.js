const express = require("express");
const router = express.Router();
// import controllers
const {
  getMyCourses,
} = require("../controllers/instructor/getMyCourses.controller");
const {
  createCourse,
} = require("../controllers/instructor/createCourse.controller");
const {
  addVideo,
  addExam,
} = require("../controllers/instructor/editSubtitle.controller");

// import middlewares
const { authInstructor } = require("../middlewares/authUserMiddleware");
const {
  authInstructorGivesCourse,
} = require("../middlewares/authInstructorGivesCourseMiddleware");

// api routes
router.post("/createCourse", authInstructor, createCourse);
router.post("/addVideo", authInstructorGivesCourse, addVideo);
router.post("/createExam", addExam);
router.get("/myCourses", authInstructor, getMyCourses);

module.exports = router;
