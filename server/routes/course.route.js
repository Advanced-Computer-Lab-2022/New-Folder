const express = require("express");
const router = express.Router();
const {
  canRateCourse,
  canDeleteRating,
  isEnrolled,
} = require("../middlewares/enrolledTraineeMiddleware");

const {
  getCourseDetails,
  getSubtitle,
  getVideo,
  addRating,
  deleteRating,
} = require("../controllers/course/courseDetails.controller");

router.get("/subtitle/video/:id", isEnrolled, getVideo);
router.get("/subtitle/:id", isEnrolled, getSubtitle);
router.get("/:id", getCourseDetails);
router.post("/addRating", canRateCourse, addRating);
router.post("/deleteRating", canDeleteRating, deleteRating);
module.exports = router;
