const Report = require("../../models/Report.model");
const status = require("../../report-status.json");
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find({ status: { $ne: status.resolved } });
    res.status(200).json(reports);
  } catch (err) {
    res.status(400);
  }
};
