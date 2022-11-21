const { default: mongoose } = require("mongoose");
const Content = require("../../models/Content.model");
const courseModel = require("../../models/Course.model");
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

  // adding to define that type of subtitle_Content is content
  content.type = constant.content;
  return content;
}

// get content from content model
async function findExcercises(ExcerciseID) {
  let excercises = await Exercises.findById(ExcerciseID);

  // adding to define that type of subtitle_Content is excercise
  excercises.type = constant.excercise;
  return excercises;
}

async function fetchAllSubtitle__Content (arr_SubTitle_Content) {
  let ans =  [];
  for (let i= 0 ; i <  arr_SubTitle_Content.length ; i++) {
    let type = arr_SubTitle_Content[i].type;
    let id = arr_SubTitle_Content[i].subTitle_Content_id.toString();

    if (type === constant.excercise){
      ans.push(await findExcercises(id));
    }else {
      ans.push(await findContents(id));
    }
  }
  return ans;
}


// get all excercises realted to the subtitle required to each saved id of excercise
// async function fetchAllExcercises(array_Excecises) {
//   let arr = [];
//   for (let i = 0; i < array_Excecises.length; i++) {
//     arr.push(await findExcercises(array_Excecises[i].toString()));
//   }
//   return arr;
// }
// get all Contents realted to the subtitle required to each saved id of Content
// async function fetchAllContents(array_Contents) {
//   let arr = [];
//   for (let i = 0; i < array_Contents.length; i++) {
//     arr.push(await findContents(array_Contents[i].toString()));
//   }

//   return arr;
// }

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
    // let subTitle__excerciseArray__IDs = courseSubtitle.exercises;
    
    // get content and excercises from database
    // let subTitle__FetchedContent = await fetchAllContents(
    //   subTitle__contentArray__IDs
    // );
    // let subTitle__FetchedExcercise = await fetchAllExcercises(
    //   subTitle__excerciseArray__IDs
    // );
    
    // conver subTitle__contentArray__IDs into JSON format with attributes
    let converted__subTitle__contentArray__IDs = await fetchAllSubtitle__Content(subTitle__contentArray__IDs);
    

    // get duration of each subtitle from content
    let duration = 0;
    for (let j = 0; j < converted__subTitle__contentArray__IDs.length; j++) {
      if (converted__subTitle__contentArray__IDs[j].type === constant.content) {
        duration = duration + parseInt(converted__subTitle__contentArray__IDs[j].duration);
        total__duration += parseInt(converted__subTitle__contentArray__IDs[j].duration);
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

module.exports = getCourseFromController;
