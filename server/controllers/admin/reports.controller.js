const Report = require("../../models/Report.model");
const status = require("../../report-status.json");
exports.getReports = async (req, res) => {
  try {
    const unresolved = await Report.find({ status: { $ne: status.resolved } });
    const resolved = await Report.find({ status: status.resolved });
    res.status(200).json({ unresolved: unresolved, resolved: resolved });
  } catch (err) {
    res.status(400);
  }
};
