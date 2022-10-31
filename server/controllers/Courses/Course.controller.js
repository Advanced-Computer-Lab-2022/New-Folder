const { default: mongoose } = require("mongoose");
const Content = require("../../models/Content");
const courseModel = require("../../models/Course");
const Exercises = require("../../models/Exercises");
const Subtitle = require("../../models/Subtitle");

async function findCoursebyID(id) {
  let courseFound = await courseModel.findOne({
    _id: id,
  });

  return courseFound;
}

// get subtitle from subtitle model
// should output array of contents and array of excercises
async function findSubtitile (subID) {
  let courseSubtitles = await Subtitle.findById(subID);
  return courseSubtitles;
}

// get content from content model
async function findContents (contentID) {
  let content = await Content.findById(contentID);
  return content;
}


// get content from content model
async function findExcercises (ExcerciseID) {
  let excercises = await Exercises.findById(ExcerciseID);
  // console.log("This is from findExcercises",excercises);
  return excercises;
}

// get all excercises realted to the subtitle required to each saved id of excercise
async function fetchAllExcercises (array_Excecises) {
  let arr = [];
  for (let i = 0 ; i  < array_Excecises.length ; i++){
    arr.push(await findExcercises(array_Excecises[i].toString()));
  }
  return arr;
}
// get all Contents realted to the subtitle required to each saved id of Content
async function fetchAllContents(array_Contents) {
  let arr = [];
  for (let i = 0 ; i  < array_Contents.length ; i++){
    arr.push(await findContents(array_Contents[i].toString()));
  }

  return arr;
  
}

let getCourseFromController = async (req, res, next) => {
  // get Course ID
  let reqId = req.params.id;

  // get Course from DB
  let coursewithreqID = await findCoursebyID(reqId);
  
  // console.log(coursewithreqID.subtitles[0].toString());
  // get required Subtitle
  let subtitle__array = [];
  for (let  subtitleIndex= 0; subtitleIndex < coursewithreqID.subtitles.length; subtitleIndex++) {
    let courseSubtitle = await findSubtitile(coursewithreqID.subtitles[subtitleIndex].toString());
    let subtitle_Number = courseSubtitle.subtitleNumber;
    let subTitle__contentArray__IDs = courseSubtitle.Contents;
    let subTitle__excerciseArray__IDs = courseSubtitle.exercises;
    
    let subTitle__FetchedContent = await fetchAllContents(subTitle__contentArray__IDs);
    let subTitle__FetchedExcercise = await fetchAllExcercises(subTitle__excerciseArray__IDs);
    // console.log(subTitle__FetchedExcercise);
    let duration = 0;
    for (let j = 0 ;j  < subTitle__FetchedContent.length; j++) {
      duration = (duration +  parseInt(subTitle__FetchedContent[j].duration));
    }

    let subtitle__finalMap = {
      subtitleNumber: subtitle_Number,
      Contents : subTitle__FetchedContent,
      exercises : subTitle__FetchedExcercise,
      duration : duration,
    }
    subtitle__array.push(subtitle__finalMap);
  }
  // console.log(subtitle__array)
  coursewithreqID.subtitles = subtitle__array;
  // coursewithreqID.subtitles.push(subtitle__array);
  
  console.log("Ambizo",coursewithreqID.subtitles[1].duration);

  res.send(coursewithreqID);
  // render and pass Course
};

module.exports = getCourseFromController;
