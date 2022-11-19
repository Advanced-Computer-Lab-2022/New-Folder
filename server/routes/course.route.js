const express = require("express");
const router = express.Router();
const protectUser = require('../middlewares/authUserMiddleware');

const getCourseFromController =  require('../controllers/course/course.controller');
router.get("/:id",getCourseFromController);


module.exports = router;