const express = require("express");
const router = express.Router();

// import controllers
const { getExplore } = require("../controllers/guest/explore.controller");
const { login } = require("../controllers/guest/login.controller");
const { logout } = require("../controllers/guest/logout.controller");

const {
  resetPassword,
} = require("../controllers/guest/resetPassword.controller");
const {
  sendPasswordResetLink,
} = require("../controllers/guest/sendPasswordResetLink.controller");
const { postSearch } = require("../controllers/guest/search.controller");

// import middlewares

// api routes
router.get("/", getExplore);
router.post("/login", login);
router.post("/logout", logout);
router.post("/search", postSearch);
router.post("/sendPasswordResetLink", sendPasswordResetLink);
router.post("/resetPassword", resetPassword);
module.exports = router;
