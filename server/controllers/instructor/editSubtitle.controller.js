const Content = require("../../models/Content.model");
const Subtitle = require("../../models/Subtitle.model");
const Exercises = require("../../models/Exercises.model");
const constants = require("../../constants.json");

const addVideo = async (req, res) => {
  const { courseID, subtitleID, videoURL, duration, description } = req.body;
  const content = await Content.create({
    courseID,
    description,
    duration,
    video: videoURL,
  });
  const subtitle = await Subtitle.findById(subtitleID);
  subtitle.subTitle_Content.push({
    subTitle_Content_id: content._id,
    type: constants.content,
  });
  await subtitle.save();
  res.status(200).json();
};

const addExam = async (req, res) => {
  const questions = req.body.questionComponentArr;
  const { subtitleID } = req.body;
  const excercise = await Exercises.create({
    Questions: questions,
    Mark: [],
  });
  const subtitle = await Subtitle.findById(subtitleID);
  subtitle.subTitle_Content.push({
    subTitle_Content_id: excercise._id,
    type: constants.excercise,
  });
  await subtitle.save();
  res.status(200).json();
};

module.exports = { addVideo, addExam };
