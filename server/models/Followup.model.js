const mongoose = require("mongoose");
const Followup = mongoose.Schema({
  reportId: {
    type: mongoose.Types.ObjectId,
    ref: "Report",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Followup", Followup);
