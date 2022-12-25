const express = require("express");
const router = express.Router();

// import controllers
const {
  getInstructorData,
} = require("../controllers/trainee/getInstructorData.controller");
const {
  changePassword,
} = require("../controllers/trainee/changePassword.controller");
const {
  rateInstructor,
  deleteInstructorReview,
} = require("../controllers/trainee/rateInstructor.controller");
const {
  getMyProblems,
} = require("../controllers/trainee/getMyProblems.controller");
const {
  payForCourse,
  getPayment,
} = require("../controllers/trainee/payment.controller");

const { getWallet } = require("../controllers/trainee/wallet.controller");
const {
  getEnrolledCourses,
} = require("../controllers/trainee/getEnrolledCourses.controller");
// import middlewares
const { authUser } = require("../middlewares/authUserMiddleware");
const {
  authUserTakeCourseWithInstructor,
} = require("../middlewares/authUserTakeCourseWithInstructorMiddleware");
const { canReport } = require("../middlewares/reportsMiddleware");
const { canEnroll } = require("../middlewares/enrollmentMiddleware");

// api routes
router.post("/changePassword", authUser, changePassword);
router.get("/wallet", authUser, getWallet);
router.get("/instructorInfo", getInstructorData);
router.get("/myProblems", canReport, getMyProblems);
router.get("/enrolledCourses", authUser, getEnrolledCourses);
router.post(
  "/rateInstructor",
  authUserTakeCourseWithInstructor,
  rateInstructor
);
router.post(
  "/deleteInstructorReview",
  authUserTakeCourseWithInstructor,
  deleteInstructorReview
);
router.post("/payForCourse", canEnroll, payForCourse);
router.post("/getPayment", canEnroll, getPayment);

module.exports = router;
