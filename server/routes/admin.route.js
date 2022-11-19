const express = require("express");
const router = express.Router();

// import controllers
const { getHome } = require("../controllers/admin/home.controller");
const {
  addInstructor,
} = require("../controllers/admin/addInstructor.controller");
const {
  addCorpTrainee,
} = require("../controllers/admin/addCorprateTrainee.controller");
const { addAdmin } = require("../controllers/admin/addAdmin.controller");
const { authAdmin } = require("../middlewares/authUserMiddleware");

// import middlewares

// api routes
// admin/
router.get("/", authAdmin, getHome);

router.post("/addInstructor", authAdmin, addInstructor);

router.post("/addCorporateTrainee", authAdmin, addCorpTrainee);

router.post("/addAdmin", authAdmin, addAdmin);

module.exports = router;
