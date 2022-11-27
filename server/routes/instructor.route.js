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

// import middlewares
const { authInstructor } = require("../middlewares/authUserMiddleware");

// api routes
router.post("/createCourse", authInstructor, createCourse);
router.get("/myCourses", authInstructor, getMyCourses);
router.get("/myProfile", authInstructor, getMyProfile);
router.post("/editMyProfile", authInstructor, editMyProfile);

module.exports = router;
