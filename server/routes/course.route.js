const express = require("express");
const router = express.Router();
const protectUser = require("../middlewares/authUserMiddleware");

const {
  getCourseDetails,
  getSubtitle,
  getCourseFromController
} = require("../controllers/course/courseDetails.controller");

router.get("/subtitle/:id", getSubtitle);
router.get("/:id", getCourseDetails);

module.exports = router;
