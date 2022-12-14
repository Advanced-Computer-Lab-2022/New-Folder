const express = require("express");
const router = express.Router();

// import controllers
const { getReports } = require("../controllers/admin/reports.controller");
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
router.post("/addInstructor", authAdmin, addInstructor);

router.post("/addCorporateTrainee", authAdmin, addCorpTrainee);

router.post("/addAdmin", authAdmin, addAdmin);

router.get("/reports", authAdmin, getReports);

module.exports = router;
