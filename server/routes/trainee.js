const express = require("express");
const router = express.Router();

// import controllers
const { getExplore } = require("../controllers/explore");
const { login } = require("../controllers/login");
const { postSearch } = require("../controllers/search");
const { getMyCourses } = require("../controllers/getMyCourses");

// import middlewares

// api routes
router.get("/", getExplore);
router.post("/login", login);
router.post("/search", postSearch);
//For instructor
router.get("/myCourses", getMyCourses);
module.exports = router;
