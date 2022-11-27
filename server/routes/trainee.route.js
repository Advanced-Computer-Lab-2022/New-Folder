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

// import middlewares
const { authUser } = require("../middlewares/authUserMiddleware");
const {
  authUserTakeCourseWithInstructor,
} = require("../middlewares/authUserTakeCourseWithInstructorMiddleware");

// api routes
router.post("/changePassword", authUser, changePassword);
router.get("/instructorInfo", authUser, getInstructorData);
router.post(
  "/rateInstructor",
  authUserTakeCourseWithInstructor,
  rateInstructor
);

module.exports = router;
