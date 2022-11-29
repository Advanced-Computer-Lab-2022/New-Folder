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
  getMyProfile,
} = require("../controllers/instructor/getMyProfile.controller");
const {
  editMyProfile,
} = require("../controllers/instructor/editMyProfile.controller");
const {
  addVideo,
  createExam,
} = require("../controllers/instructor/editSubtitle.controller");

// import middlewares
const { authInstructor } = require("../middlewares/authUserMiddleware");
const {
  authInstructorGivesCourse,
} = require("../middlewares/authInstructorGivesCourseMiddleware");

// api routes
router.post("/createCourse", authInstructor, createCourse);
router.post("/addVideo", authInstructorGivesCourse, addVideo);
router.post("/createExam", authInstructorGivesCourse, createExam);
router.get("/myCourses", authInstructor, getMyCourses);
router.get("/myProfile", authInstructor, getMyProfile);
router.post("/editMyProfile", authInstructor, editMyProfile);

module.exports = router;
