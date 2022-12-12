const User = require("../../models/User.model");
const Report = require("../../models/Report.model");

exports.getMyProblems = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const reports = await Report.find({
      _id: {
        $in: user.reports,
      },
    });
    res.status(201).send(reports);
  } catch (err) {
    console.log(err);
  }
};
