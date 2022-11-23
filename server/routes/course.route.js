const express = require("express");
const router = express.Router();
const protectUser = require("../middlewares/authUserMiddleware");

const {
  getCourseFromController,
  getSubtitle,
} = require("../controllers/course/courseDetails.controller");

router.get("/subtitle", getSubtitle);
router.get("/:id", getCourseFromController);

module.exports = router;
