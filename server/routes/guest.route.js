const express = require("express");
const router = express.Router();

// import controllers
const { getExplore } = require("../controllers/guest/explore.controller");
const { login } = require("../controllers/guest/login.controller");
const {
  changePassword,
} = require("../controllers/guest/changePassword.controller");
const {
  sendPasswordResetLink,
} = require("../controllers/guest/sendPasswordResetLink.controller");
const { postSearch } = require("../controllers/guest/search.controller");
const {
  getInstructorData,
} = require("../controllers/guest/viewInstructorInfo.controller");

// import middlewares
const { authUser } = require("../middlewares/authUserMiddleware");

// api routes
router.get("/", getExplore);
router.get("/instructorInfo", getInstructorData);
router.post("/login", login);
router.post("/changePassword", authUser, changePassword);
router.post("/search", postSearch);
router.post("/sendPasswordResetLink", sendPasswordResetLink);
module.exports = router;
