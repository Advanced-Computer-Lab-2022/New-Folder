const express = require("express");
const router = express.Router();
const {
  registerInstructor,
  getInstructor,
  loginInstructor,
} = require("../controllers/instructorController");
const { protectInstructor } = require("../middleWare/authInstructorMiddleWare");
// import controllers

// import middlewares

// api routes

router.post("/", registerInstructor);
router.post("/login", loginInstructor);
router.get("/me", protectInstructor, getInstructor);

module.exports = router;
