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

const {
  getRequests,
  deleteRequest,
  approveRequest,
} = require("../controllers/admin/requests.controller");

// import middlewares
const { authAdmin } = require("../middlewares/authUserMiddleware");

// api routes
// admin/
router.post("/addInstructor", authAdmin, addInstructor);

router.post("/addCorporateTrainee", authAdmin, addCorpTrainee);

router.post("/addAdmin", authAdmin, addAdmin);

router.get("/reports", authAdmin, getReports);

router.get("/requests", authAdmin, getRequests);

router.post("/requests/approve/:id", authAdmin, approveRequest);

router.delete("/requests/:id", authAdmin, deleteRequest);

module.exports = router;
