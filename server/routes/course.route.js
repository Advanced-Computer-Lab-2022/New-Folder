const express = require("express");
const router = express.Router();
const protectUser = require("../middlewares/authUserMiddleware");

const {
  getCourseDetails,
  getSubtitle,
  getVideo,
  addRating,
  deleteRating,
} = require("../controllers/course/courseDetails.controller");

router.get("/subtitle/video/:id", getVideo);
router.get("/subtitle/:id", getSubtitle);
router.get("/:id", getCourseDetails);
router.post("/addRating", addRating);
router.post("/deleteRating", deleteRating);
module.exports = router;
