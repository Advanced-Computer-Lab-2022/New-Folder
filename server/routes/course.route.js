const express = require("express");
const router = express.Router();
const {
  canRateCourse,
  canDeleteRating,
  isEnrolled,
} = require("../middlewares/enrolledTraineeMiddleware");
const { canAddPromotion } = require("../middlewares/canAddPromotionMiddleware");
const {
  getCourseDetails,
  getSubtitle,
  getVideo,
  getExcercise,
  addReview,
  deleteRating,
  addPromotion,
  updateCourse,
  createSubtitle,
  UpdateMark
} = require("../controllers/course/courseDetails.controller");

router.patch("/subtitle/excercise/:id/addMark",UpdateMark);
router.get("/subtitle/excercise/:id", getExcercise);
router.get("/subtitle/video/:id", getVideo);
router.get("/subtitle/:id", getSubtitle);
router.get("/:id", getCourseDetails);
router.patch("/addRating", canRateCourse, addReview);
router.patch("/deleteRating", canDeleteRating, deleteRating);
router.patch("/addPromotion", canAddPromotion, addPromotion);
router.patch("/:id", updateCourse);
router.patch("/:id/newsubtitle", createSubtitle);
module.exports = router;
