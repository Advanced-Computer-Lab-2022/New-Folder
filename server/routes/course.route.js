const express = require("express");
const router = express.Router();


const getCourseFromController =  require('../controllers/Courses/Course.controller');
router.get("/:id",getCourseFromController);


module.exports = router;