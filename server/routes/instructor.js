const express = require("express");
const router = express.Router();

// import controllers
const { getMyCourses } = require("../controllers/instructor/myCourses");

// import middlewares

// api routes
router.get("/", getMyCourses);

module.exports = router;
