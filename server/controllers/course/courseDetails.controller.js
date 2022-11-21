const { default: mongoose } = require("mongoose");
const Content = require("../../models/Content.model");
const courseModel = require("../../models/Course.model");
const Exercises = require("../../models/Exercises.model");
const Subtitle = require("../../models/Subtitle.model");

async function findCoursebyID(id) {
  let courseFound = await courseModel.findOne({
    _id: id,
  });

  return courseFound;
}

// get subtitle from subtitle model
// should output array of contents and array of excercises
async function findSubtitile(subID) {
  let courseSubtitles = await Subtitle.findById(subID);
  return courseSubtitles;
}

// get content from content model
async function findContents(contentID) {
  let content = await Content.findById(contentID);
  return content;
}

// get content from content model
async function findExcercises(ExcerciseID) {
  let excercises = await Exercises.findById(ExcerciseID);
  return excercises;
}

// get all excercises realted to the subtitle required to each saved id of excercise
async function fetchAllExcercises(array_Excecises) {
  let arr = [];
  for (let i = 0; i < array_Excecises.length; i++) {
    arr.push(await findExcercises(array_Excecises[i].toString()));
  }
  return arr;
}
// get all Contents realted to the subtitle required to each saved id of Content
async function fetchAllContents(array_Contents) {
  let arr = [];
  for (let i = 0; i < array_Contents.length; i++) {
    arr.push(await findContents(array_Contents[i].toString()));
  }

  return arr;
}

// Gets the duration of every subtitle in the course and accumlates the duratiions to get the total duration of the course.
// Gets every subtitle with its corresponding content and video and refactors it in json format, Exactly
let getCourseFromController = async (req, res, next) => {
  // get Course ID
  let reqId = req.params.id;
  // GET TOTOAL DURATION
  let total__duration = 0;
  // get Course from DB
  let coursewithreqID = await findCoursebyID(reqId);
  // get required Subtitle
  let subtitle__array = [];
  for (
    let subtitleIndex = 0;
    subtitleIndex < coursewithreqID.subtitles.length;
    subtitleIndex++
  ) {
    let courseSubtitle = await findSubtitile(
      coursewithreqID.subtitles[subtitleIndex].toString()
    );
    let subtitle_Number = courseSubtitle.subtitleNumber;
    let subTitle__contentArray__IDs = courseSubtitle.Contents;
    let subTitle__excerciseArray__IDs = courseSubtitle.exercises;

    let subTitle__FetchedContent = await fetchAllContents(
      subTitle__contentArray__IDs
    );
    let subTitle__FetchedExcercise = await fetchAllExcercises(
      subTitle__excerciseArray__IDs
    );
    let duration = 0;
    for (let j = 0; j < subTitle__FetchedContent.length; j++) {
      duration = duration + parseInt(subTitle__FetchedContent[j].duration);
      total__duration += parseInt(subTitle__FetchedContent[j].duration);
    }

    let subtitle__finalMap = {
      subtitleNumber: subtitle_Number,
      Contents: subTitle__FetchedContent,
      exercises: subTitle__FetchedExcercise,
      duration: duration,
    };
    subtitle__array.push(subtitle__finalMap);
  }
  coursewithreqID.subtitles = subtitle__array;

  coursewithreqID.duration = total__duration;

  res.send(coursewithreqID);
};

module.exports = getCourseFromController;
