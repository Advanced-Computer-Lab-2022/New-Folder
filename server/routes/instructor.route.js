const express = require("express");
const router = express.Router();
// import controllers
const {
  getMyCourses,
} = require("../controllers/instructor/getMyCourses.controller");
const {
  createCourse,
} = require("../controllers/instructor/createCourse.controller");
const { authUser } = require("../middlewares/authUserMiddleware");
// import middlewares

// api routes

router.post("/createCourse", createCourse);
router.get("/myCourses", authUser, getMyCourses);

module.exports = router;
