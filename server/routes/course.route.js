const express = require("express");
const router = express.Router();
const protectUser = require('../middlewares/authUserMiddleware');

const getCourseFromController =  require('../controllers/Courses/Course.controller');
router.get("/:id",protectUser,getCourseFromController);


module.exports = router;