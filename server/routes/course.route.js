const express = require("express");
const router = express.Router();
const {
  canRateCourse,
  canDeleteRating,
} = require("../middlewares/enrolledTraineeMiddleware");
const { canReport } = require("../middlewares/reportsMiddleware");
const {
  canRequestAccess,
} = require("../middlewares/corporateTraineeMiddleware");
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
  submitReport,
  requestAccess,
} = require("../controllers/course/courseDetails.controller");

router.get("/subtitle/excercise/:id", getExcercise);
router.get("/subtitle/video/:id", getVideo);
router.get("/subtitle/:id", getSubtitle);
router.get("/:id", getCourseDetails);
router.patch("/addRating", canRateCourse, addReview);
router.patch("/deleteRating", canDeleteRating, deleteRating);
router.patch("/addPromotion", canAddPromotion, addPromotion);
router.patch("/:id", updateCourse);
router.patch("/:id/newsubtitle", createSubtitle);
router.post("/report", canReport, submitReport);
router.post("/requestAccess", canRequestAccess, requestAccess);
module.exports = router;
