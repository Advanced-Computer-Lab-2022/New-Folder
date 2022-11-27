const express = require("express");
const router = express.Router();
const protectUser = require("../middlewares/authUserMiddleware");

const {
  getCourseDetails,
  getSubtitle,
  getVideo,
  getExcercise
} = require("../controllers/course/courseDetails.controller");

router.get("/subtitle/excercise/:id",getExcercise );
router.get("/subtitle/video/:id", getVideo);
router.get("/subtitle/:id", getSubtitle);
router.get("/:id", getCourseDetails);

module.exports = router;
