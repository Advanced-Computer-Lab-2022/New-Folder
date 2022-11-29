const { default: mongoose } = require("mongoose");
const Content = require("../../models/Content.model");
const Course = require("../../models/Course.model");
const Exercises = require("../../models/Exercises.model");
const Subtitle = require("../../models/Subtitle.model");
const constant = require("../../constants.json");

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
  let con = content.toObject();
  // adding to define that type of subtitle_Content is content
  con.typeOfSubtitle = constant.content;
  return con;
}

// get content from content model
async function findExcercises(ExcerciseID) {
  let excercises = await Exercises.findById(ExcerciseID);

  let ex = excercises.toObject();
  // adding to define that type of subtitle_Content is excercise
  ex.typeOfSubtitle = constant.excercise;
  return ex;
}

async function fetchAllSubtitle__Content(arr_SubTitle_Content) {
  let ans = [];
  for (let i = 0; i < arr_SubTitle_Content.length; i++) {
    let type = arr_SubTitle_Content[i].type;
    let id = arr_SubTitle_Content[i].subTitle_Content_id.toString();

    if (type === constant.excercise) {
      ans.push(await findExcercises(id));
    } else {
      ans.push(await findContents(id));
    }
  }
  return ans;
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

  // get required Subtitles
  let subtitle__array = [];

  // loop at each subtitle and get content and excercise from each subtitle
  for (
    let subtitleIndex = 0;
    subtitleIndex < coursewithreqID.subtitles.length;
    subtitleIndex++
  ) {
    let courseSubtitle = await findSubtitile(
      coursewithreqID.subtitles[subtitleIndex].toString()
    );

    // subtitle Number
    let subtitle_Number = courseSubtitle.subtitleNumber;

    // Arrays of IDs of Content and Excercises
    let subTitle__contentArray__IDs = courseSubtitle.subTitle_Content;

    // conver subTitle__contentArray__IDs into JSON format with attributes
    let converted__subTitle__contentArray__IDs =
      await fetchAllSubtitle__Content(subTitle__contentArray__IDs);

    // get duration of each subtitle from content
    let duration = 0;
    for (let j = 0; j < converted__subTitle__contentArray__IDs.length; j++) {
      if (
        converted__subTitle__contentArray__IDs[j].typeOfSubtitle ===
        constant.content
      ) {
        duration =
          duration +
          parseInt(converted__subTitle__contentArray__IDs[j].duration);
        total__duration += parseInt(
          converted__subTitle__contentArray__IDs[j].duration
        );
      }
    }

    // adding a new attribute ( duration )
    let subtitle__finalMap = {
      subtitleNumber: subtitle_Number,
      subTitle_Content: converted__subTitle__contentArray__IDs,
      duration: duration,
    };

    subtitle__array.push(subtitle__finalMap);
  }

  coursewithreqID.subtitles = subtitle__array;

  coursewithreqID.duration = total__duration;

  res.send(coursewithreqID);
};

const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};

const getSubtitle = async (req, res) => {
  try {
    const subtitle = await Subtitle.findById(req.params.id);
    res.json(subtitle);
  } catch (err) {
    console.log(err);
  }
};

const getVideo = async (req, res) => {
  try {
    const video = await Content.findById(req.params.id);
    res.json(video);
  } catch (err) {
    console.log(err);
  }
};

const addRating = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    let ratings = course.ratings;
    const totalRating =
      (course.totalRating * ratings.length + req.body.rating) /
      (ratings.length + 1);
    ratings.push({ trainee: req.session.userId, rating: req.body.rating });
    await Course.findByIdAndUpdate(course._id, {
      ratings: ratings,
      totalRating: totalRating,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteRating = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    let ratings = [];
    let traineeRating = 0;
    for (let i = 0; i < course.ratings.length; i++) {
      if (course.ratings[i].trainee.toString() !== req.session.userId) {
        ratings.push(course.ratings[i]);
      } else {
        traineeRating = course.ratings[i].rating;
      }
    }
    const totalRating =
      ratings.length == 0
        ? 0
        : (course.totalRating * (ratings.length + 1) - traineeRating) /
          ratings.length;
    await Course.findByIdAndUpdate(course._id, {
      ratings: ratings,
      totalRating: totalRating,
    });
  } catch (err) {
    console.log(err);
  }
};
const updateIntroVideo = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { introVideo: req.body.videoLink },
      { new: true }
    );
    res.json(updatedCourse);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCourseDetails,
  getSubtitle,
  getVideo,
  addRating,
  deleteRating,
  updateIntroVideo,
};
