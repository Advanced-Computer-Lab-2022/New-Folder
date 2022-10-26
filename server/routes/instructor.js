const express = require("express");
const { getExplore } = require("../controllers/explore");
const router = express.Router();
const { login } = require("../controllers/login");
const { protectUser } = require("../middlewares/authUserMiddleware");
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
