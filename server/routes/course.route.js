const express = require("express");
const router = express.Router();
const {
  canRateCourse,
  canDeleteRating,
} = require("../middlewares/enrolledTraineeMiddleware");
const {
  canReport,
  canAddFollowup,
} = require("../middlewares/reportsMiddleware");
const {
  canRequestAccess,
  canDeleteRequestAccess,
} = require("../middlewares/corporateTraineeMiddleware");
const {
  canAddPromotion,
  canAddMultiPromotion,
} = require("../middlewares/canAddPromotionMiddleware");
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
  getVisits,
  submitReport,
  requestAccess,
  addFollowup,
  deleteAccessRequest,
  updateStatus,
  addMultiPromotion,
} = require("../controllers/course/courseDetails.controller");

router.get("/subtitle/excercise/:id/getMark", getMark);
router.patch("/subtitle/excercise/:id/addMark", UpdateMark);

router.delete(
  "/:id/cancelAccessRequest",
  canDeleteRequestAccess,
  deleteAccessRequest
);
router.get("/subtitle/excercise/:id", getExcercise);
router.patch("/subtitle/video/:id/addNote", updateNote);
router.get("/subtitle/video/:id/getNote", getNote);
router.get("/subtitle/video/:id", getVideo);
router.get("/subtitle/:id", getSubtitle);
router.patch("/subtitle/isVisited/:conID/:contentType", updateVisits);
router.get("/subtitle/isVisited/:conID/:contentType", getVisits);
router.get("/:id", getCourseDetails);
router.patch("/report/:id", updateStatus);
router.patch("/addRating", canRateCourse, addReview);
router.patch("/deleteRating", canDeleteRating, deleteRating);
router.patch("/addPromotion", canAddPromotion, addPromotion);
router.patch("/addMultiPromotion", canAddMultiPromotion, addMultiPromotion);
router.patch("/:id", updateCourse);
router.patch("/:id/newsubtitle", createSubtitle);
router.post("/report", canReport, submitReport);
router.post("/requestAccess", canRequestAccess, requestAccess);
router.post("/addFollowup", canAddFollowup, addFollowup);
module.exports = router;
