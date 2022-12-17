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
  UpdateMark,
  getMark,
  updateNote,
  getNote,
  updateVisits,
  getVisits
} = require("../controllers/course/courseDetails.controller");

router.get("/subtitle/excercise/:id/getMark",getMark);
router.patch("/subtitle/excercise/:id/addMark",UpdateMark);
router.get("/subtitle/excercise/:id", getExcercise);
router.patch("/subtitle/video/:id/addNote", updateNote);
router.get("/subtitle/video/:id/getNote", getNote);
router.get("/subtitle/video/:id", getVideo);
router.get("/subtitle/:id", getSubtitle);
router.patch("/subtitle/isVisited/:conID/:contentType" , updateVisits);
router.get("/subtitle/isVisited/:conID/:contentType" , getVisits);
router.get("/:id", getCourseDetails);
router.patch("/addRating", canRateCourse, addReview);
router.patch("/deleteRating", canDeleteRating, deleteRating);
router.patch("/addPromotion", canAddPromotion, addPromotion);
router.patch("/:id", updateCourse);
router.patch("/:id/newsubtitle", createSubtitle);
module.exports = router;
