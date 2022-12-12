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
} = require("../controllers/trainee/rateInstructor.controller");
const {
  getMyProblems,
} = require("../controllers/trainee/getMyProblems.controller");
// import middlewares
const { authUser } = require("../middlewares/authUserMiddleware");
const {
  authUserTakeCourseWithInstructor,
} = require("../middlewares/authUserTakeCourseWithInstructorMiddleware");
const { canReport } = require("../middlewares/reportsMiddleware");
// api routes
router.post("/changePassword", authUser, changePassword);
router.get("/instructorInfo", getInstructorData);
router.get("/myProblems", canReport, getMyProblems);
router.post(
  "/rateInstructor",
  authUserTakeCourseWithInstructor,
  rateInstructor
);

module.exports = router;
