import axios from "axios";
import countryCurrency from "./constants/CountryCurrency.json";
import { ReactSession } from "react-client-session";
import {
  getDurationInMinutes,
  getYoutubeVideoID,
} from "./utils/getVideoDurationUtils";

import UserTypes from "../src/constants/UserTypes.json";

// if you delete this part ghosts will haunt you at night
const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080",
});

//maximum time elapses before dropping the request
const MAX_TIMEOUT = 60000;

// Explore
export const fetchExploreData = async () => {
  const res = await instance.get("/", {
    timeout: MAX_TIMEOUT,
  });
  return res.data;
};

export const fetchCourseDetails = async (id) => {
  const res = await instance.get("/course/" + id, {
    timeout: MAX_TIMEOUT,
  });
  return res.data;
};

// Create Course
export const postCourse = async (data) => {
  const res = await instance.post("/instructor/createCourse", data);
  console.log(res.data);
  return res.data;
};

// Add Admin
const postAddadmin = async (data) => {
  const res = await instance.post("/admin/addAdmin", data);
  console.log(res.data);
  return res.data;
};

// Add Instructor
const postAddInstructor = async (data) => {
  const res = await instance.post("/admin/addInstructor", data);
  console.log(res.data);
  return res.data;
};

// Add Corporate Trainee
const postAddCorporateTrainee = async (data) => {
  const res = await instance.post("/admin/addCorporateTrainee", data);
  console.log(res.data);
  return res.data;
};
// post Add User
export const postAddUser = async (userType, data) => {
  if (userType === UserTypes.admin) {
    return postAddadmin(data);
  } else if (userType === UserTypes.instructor) {
    return postAddInstructor(data);
  } else if (userType === UserTypes.corporateTrainee) {
    return postAddCorporateTrainee(data);
  }
  return {};
};

// Search results
export const fetchSearchData = async (query) => {
  const res = await instance.post("/search", query);
  return res.data;
};

// Login
export const login = async (loginData) => {
  const res = await instance.post("/login", loginData);
  return res;
};

// Login
export const networkLogout = async () => {
  await instance.post("/logout");
};
// Change password
export const changePassword = async (data) => {
  const res = await instance.post("/trainee/changePassword", data);
  return res;
};

// Reset password
export const resetPassword = async (data) => {
  const res = await instance.post("/resetPassword", data);
  return res;
};

// send password reset link
export const sendPasswordResetLink = async (data) => {
  const res = await instance.post("/sendPasswordResetLink", data);
  return res;
};

export const getPrice = async (price) => {
  const data = {
    magnitude: price.magnitude,
    oldCurrency: price.currency,
    newCurrency: countryCurrency.country_currency[ReactSession.get("country")],
  };
  const res = await instance.post("/convertCurrency", data);
  return res.data.magnitude.toFixed(2) + " " + res.data.currency;
};

export const fetchMyCourses = async () => {
  const res = await instance.get("/instructor/myCourses", {
    timeout: MAX_TIMEOUT,
  });
  return res.data;
};

// instructor info for the ViewInstructorProfile page
export const fetchInstructorData = async (instructorID) => {
  const res = await instance.get("/trainee/instructorInfo", {
    params: {
      instructorID: instructorID,
    },
    timeout: MAX_TIMEOUT,
  });
  return res.data;
};

// rate and review instructor
export const rateInstructor = async (data) => {
  const res = await instance.post("/trainee/rateInstructor", data);
  return res;
};

// get MyProfile for instructor
export const getMyProfile = async () => {
  const res = await instance.get("/instructor/myProfile", {
    timeout: MAX_TIMEOUT,
  });
  return res.data;
};

// edit MyProfile for instructor
export const editMyProfile = async (data) => {
  const res = await instance.post("/instructor/editMyProfile", data);
  return res;
};
// get subtitle
export const fetchSubtitle = async (id) => {
  const res = await instance.get("/course/subtitle/" + id);
  return res.data;
};

// get video duration in minutes
export const getVideoDuration = async (url) => {
  const videoID = getYoutubeVideoID(url);
  if (!videoID) return 0;

  const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=contentDetails&key=AIzaSyDFV_VGCr9gLfuxpkbuFv3klrd3LiafWXc`
  );

  const duration = res.data.items[0].contentDetails.duration;

  return getDurationInMinutes(duration);
};

// instructor add video data:{ courseID, subtitleID ,....}
export const addVideo = async (data) => {
  const { videoURL } = data;
  const duration = await getVideoDuration(videoURL);
  const res = await instance.post("/instructor/addVideo", {
    duration,
    ...data,
  });
  return res;
};

// instructor create exam data:{courseID , subtitleID,......}
export const addExam = async (data) => {
  const res = await instance.post("/instructor/createExam", data);
  return res;
};

// get Video
export const fetchVideoContent = async (id) => {
  const res = await instance.get("/course/subtitle/video/" + id);
  return res.data;
};

export const fetchExcercise = async (id) => {
  const res = await instance.get("/course//subtitle/excercise/" + id);
  return res.data;
};

export const fetchTraineeName = async (id) => {
  const res = await instance.get("/trainee/name/" + id);
  return res;
};
//addRating
export const addRating = async (data) => {
  const res = await instance.patch("/course/addRating", data);
  return res;
};
//deleteRating
export const deleteRating = async (data) => {
  const res = await instance.patch("/course/deleteRating", data);
  return res;
};

// General Update course
export const updateCourse = async (courseId, data) => {
  const res = await instance.patch(`course/${courseId}`, data);
  return res.data;
};

export const createNewSubtitle = async (courseId, subtitle) => {
  const res = await instance.patch(`course/${courseId}/newsubtitle`, {
    subtitle: subtitle,
  });
  return res.data;
};

//Add promotion
export const postPromotion = async (courseId, promotion) => {
  try {
    const res = await instance.patch("course/addPromotion", {
      courseId: courseId,
      promotion: promotion,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//Add and update Exercise Mark
export const postMark = async (exerciseID, mark) => {
  try {
    const res = await instance.patch(
      "course/subtitle/excercise/" + exerciseID + "/addMark",
      {
        Mark: mark,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//Add report
export const postReport = async (data) => {
  try {
    const res = await instance.post("course/report", data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//Get problems
export const getMyProblems = async () => {
  try {
    const res = await instance.get("trainee/myProblems");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// get all reports
export const fetchReports = async () => {
  const res = await instance.get("admin/reports");
  return res.data;
};

// enroll in a course (payment)
export const payForCourse = async (data) => {
  const res = await instance.post("/trainee/payForCourse", data);
  return res.data;
};

//Add report
export const postAccessRequest = async (data) => {
  try {
    const res = await instance.post("course/requestAccess", data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//Add followup on a report
export const addFollowup = async (data) => {
  try {
    const res = await instance.post("course/addFollowup", data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// cancel request access
export const deleteAccessRequest = async (courseId) => {
  try {
    const res = await instance.delete(`course/${courseId}/cancelAccessRequest`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// update Report status
export const updateReportStatus = async (id, data) => {
  const res = await instance.patch(`course/report/${id}`, data);
  // updatedData
  return res.data;
};

// trainee get amount in wallet
export const getAmountInWallet = async () => {
  const res = await instance.get("/trainee/wallet", {
    timeout: MAX_TIMEOUT,
  });
  return res.data;
};

// trainee get enrolled courses
export const getEnrolledCourses = async () => {
  const res = await instance.get("/trainee/enrolledCourses", {
    timeout: MAX_TIMEOUT,
  });
  return res.data;
};

//Add multible promotions
export const postMultiPromotion = async (courses, promotion) => {
  try {
    const res = await instance.patch("course/addMultiPromotion", {
      courses: courses,
      promotion: promotion,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// get Excercise mark of trainee
export const FetchMark = async (exerciseID) => {
  try {
    const res = await instance.get(
      "course/subtitle/excercise/" + exerciseID + "/getMark"
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// add trainee's note
export const postNote = async (contentID, note) => {
  try {
    const res = await instance.patch(
      "course/subtitle/video/" + contentID + "/addNote",
      {
        Note: note,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const FetchNote = async (contentId) => {
  try {
    const res = await instance.get(
      "course/subtitle/video/" + contentId + "/getNote"
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const FetchContentVisit = async (contentId, contentType) => {
  try {
    const res = await instance.get(
      "course/subtitle/isVisited/" + contentId + "/" + contentType
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const UpdateContentVisit = async (contentId, contentType) => {
  try {
    const res = await instance.patch(
      "course/subtitle/isVisited/" + contentId + "/" + contentType
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// instructor get earnings
export const getEarnings = async () => {
  const res = await instance.get("/instructor/myEarnings", {
    timeout: MAX_TIMEOUT,
  });
  return res.data;
};

// get all reports
export const fetchRequests = async () => {
  const res = await instance.get("admin/requests");
  return res.data;
};

// decline access request
export const declineAccessRequest = async (requestId) => {
  const res = await instance.delete(`admin/requests/${requestId}`);
  return res;
};

export const approveAccessRequest = async (requestId) => {
  const res = await instance.post(`admin/requests/approve/${requestId}`);
  return res;
};

// Signup
export const signup = async (data) => {
  const res = await instance.post("/signup", data);
  return res;
};

// request refund
export const requestRefund = async (data) => {
  try {
    await instance.post("/course/requestRefund", data);
    console.log("mango");
  } catch (err) {
    console.log(err);
  }
};

// request refund
export const cancelRefund = async (courseId) => {
  try {
    const res = await instance.delete(`course/${courseId}/cancelRefundRequest`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// get all refunds
export const getRefunds = async () => {
  try {
    const res = await instance.get('/admin/refunds');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
