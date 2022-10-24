const express = require("express");
const router = express.Router();

// import controllers
const {getMyCourses} = require("../controllers/instructor/myCourses");
const {createCourse} = require('../controllers/instructor/createCourse')
// import middlewares

// api routes
router.get("/",getMyCourses);

router.post("/createCourse", createCourse)


module.exports = router;