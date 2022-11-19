// don't run the data already on the db
const mongoose = require("mongoose");
const Content = require("./Content");
const Course = require("./Course");
const Exercises = require("./Exercises");
const Instructor = require("./Instructor");
const Subtitle = require("./Subtitle");
const Trainee = require("./Trainee");
const bodyParser = require("body-parser");

mongoose
  .connect(
    "mongodb+srv://NewFolderTeam:pass123456@cluster0.qvnetbs.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR", err));

// insert new courses
async function insertCourse(
  name,
  subject,
  priceMag,
  priceCurr,
  description,
  image,
  introVideo,
  rating,
  ratingNo,
  reviews,
  instructorID,
  instructorName,
  trainees,
  subtitles
) {
  let c = await Course.create({
    name: name,
    subject: subject,
    price: {
      magnitude: priceMag,
      currency: priceCurr,
    },
    description: description,
    image: image,
    introVideo: introVideo,
    rating: rating,
    ratingNo: ratingNo,
    reviews: reviews,
    instructorInfo: {
      instructorID: instructorID,
      instructorName: instructorName,
    },
    trainees: trainees,
    subtitles: subtitles,
  });

  console.log(c.name + "COURSE has been added ✔️");
  return c;
}

// insert new Instructor
async function insertInstructor(
  email,
  username,
  password,
  gender,
  firstName,
  lastName,
  image,
  country,
  about,
  rating,
  ratingNo,
  courses,
  reviews
) {
  let c = await Instructor.create({
    email: email,
    username: username,
    password: password,
    gender: gender,
    firstName: firstName,
    lastName: lastName,
    image: image,
    country: country,
    about: about,
    courses: courses,
    ratingNo: ratingNo,
    rating: rating,
    reviews: reviews,
  });

  console.log("INSTRUCTOR has been added ✔️");
  return c;
}

//insert new Trainee (individual or corporate)
async function insertTrainee(
  email,
  username,
  password,
  fields,
  gender,
  firstName,
  lastName,
  image,
  country,
  courses
) {
  let c = await Trainee.create({
    email: email,
    username: username,
    password: password,
    fields: fields,
    gender: gender,
    firstName: firstName,
    lastName: lastName,
    image: image,
    country: country,
    courses: courses,
  });

  console.log("TRAINEE has been added ✔️");
  return c;
}

// insert new content
async function insertContent(courseID, description, duration, video) {
  let c = await Content.create({
    courseID: courseID,
    description: description,
    duration: duration,
    video: video,
  });
  console.log("CONTENT has been added ✔️");
  return c;
}

// insert new Excercise
async function insertExcercises(
  statement,
  firstAns,
  secondAns,
  thirdAns,
  forthAns,
  correctIdx
) {
  let c = await Exercises.create({
    Questions: [
      {
        statement: statement,
        choices: [firstAns, secondAns, thirdAns, forthAns],
        correctIdx: correctIdx,
      },
    ],
  });
  console.log("Excercise has been added ✔️");
  return c;
}

// insert new Subtitle
async function insertSubtitle(subtitleNumber, Contents, exercises) {
  let c = await Subtitle.create({
    subtitleNumber: subtitleNumber,
    Contents: Contents,
    exercises: exercises,
  });
  console.log("Subtitle has been added ✔️");
  return c;
}

// insert a new trainee to a course
async function insertTraineeToCourse(courseID, traineeID) {
  let courseReq = await Course.find({ _id: courseID });
  courseReq[0].trainees.push(traineeID);

  await Course.updateMany(
    {
      _id: courseID,
    },
    {
      trainees: courseReq[0].trainees,
    }
  );

  console.log("DONE INSERTION of trainee to course");
}

// insert a new subtitle into this course

async function insertSubtitleToCourse(courseID, subtitle) {
  let courseReq = await Course.find({ _id: courseID });
  courseReq[0].subtitles.push(subtitle);

  await Course.updateMany(
    {
      _id: courseID,
    },
    {
      subtitles: courseReq[0].subtitles,
    }
  );

  console.log("DONE INSERTION of trainee to course");
}

async function populate() {
  let soubra = await insertInstructor(
    "soubra@gmail.com",
    "soubraJokexD",
    "0000",
    "Male",
    "Hassan Hassona",
    "Soubra",
    "",
    "UAE",
    "RAGL MEYA MEYA",
    5,
    5,
    [],
    []
  );

  let java = await insertCourse(
    "Java OOP",
    "Computer Science",
    18,
    "USA",
    "This course introduces computer programming using the JAVA programming language with object-oriented programming principles",
    "https://www.aacomputercollege.com/wp-content/uploads/2018/08/java-1030x579.jpg",
    "",
    5,
    5,
    [],
    soubra._id,
    "Hassan Soubra",
    [],
    []
  );

  let sokk = await insertTrainee(
    "alyhassan123456@gmail.com",
    "Elsokkary101",
    "1234",
    ["Computer Science"],
    "Male",
    "Aly Hassan",
    "Elsokkary",
    "",
    "",
    [java._id],
    false
  );

  let questionaya = await insertExcercises(
    "masr gabl el goal el wa7eed fe kas el 3ala sanet kam ?",
    "1900",
    "4526",
    "2001",
    "1920",
    3
  );
  let contentaya = await insertContent(java._id, "masr masr masrrrr", "", "");

  let Subtitlaya = await insertSubtitle(1, [contentaya], [questionaya]);

  await insertTraineeToCourse(java._id, sokk._id);
  await insertSubtitleToCourse(java._id, Subtitlaya);

  console.log("Relation has been done ✔️ ");
}

populate();
