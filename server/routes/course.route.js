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
  updateCourse,
  createSubtitle,
} = require("../controllers/course/courseDetails.controller");

router.get("/subtitle/video/:id", getVideo);
router.get("/subtitle/:id", getSubtitle);
router.get("/:id", getCourseDetails);
router.post("/addRating", canRateCourse, addRating);
router.post("/deleteRating", canDeleteRating, deleteRating);
router.patch("/:id", updateCourse);
router.patch("/:id/newsubtitle", createSubtitle);
module.exports = router;
