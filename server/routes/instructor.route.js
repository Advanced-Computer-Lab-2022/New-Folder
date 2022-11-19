const express = require("express");
const router = express.Router();
// import controllers
const { postSearch } = require("../controllers/search");
const { getMyCourses } = require("../controllers/instructor/getMyCourses");
const { createCourse } = require("../controllers/instructor/createCourse");
const { authUser } = require("../middlewares/authUserMiddleware");
// import middlewares

// api routes

router.post("/createCourse", createCourse);
router.get("/myCourses", authUser, getMyCourses);
router.post("/createCourse", createCourse);
router.post("/search", postSearch);

module.exports = router;
