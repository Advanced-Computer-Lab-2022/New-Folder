import axios from "axios";
import countryCurrency from "./constants/CountryCurrency.json";
import { ReactSession } from "react-client-session";
import {
  getDurationInMinutes,
  getYoutubeVideoID,
} from "./utils/getVideoDurationUtils";

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
export const postAddadmin = async (data) => {
  const res = await instance.post("/admin/addAdmin", data);
  console.log(res.data);
  return res.data;
};

// Add Instructor
export const postAddInstructor = async (data) => {
  const res = await instance.post("/admin/addInstructor", data);
  console.log(res.data);
  return res.data;
};

// Add Corporate Trainee
export const postAddCorporateTrainee = async (data) => {
  const res = await instance.post("/admin/addCorporateTrainee", data);
  console.log(res.data);
  return res.data;
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
  const rates = await axios.get("https://api.exchangerate.host/latest");
  const currCurrency =
    countryCurrency.country_currency[ReactSession.get("country")];
  const courseCurrency = price.currency;
  var magnitude = price.magnitude;
  const ratio =
    rates.data.rates[currCurrency] / rates.data.rates[courseCurrency];
  return (magnitude * ratio).toFixed(2) + " " + currCurrency;
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
//addRating
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
export const postMark = async (exerciseID , mark) => {
  try {
    const res = await instance.patch("course/subtitle/excercise/"+ exerciseID + "/addMark", {
      Mark: mark,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// get Excercise mark of trainee
export const FetchMark  = async (exerciseID) => {
  try {
    const res = await instance.get("course/subtitle/excercise/"+exerciseID+"/getMark");
    return res.data;
  }catch (err) {
    console.log(err);
  }
}

// add trainee's note
export const postNote = async (contentID , note) => {
  try {
    const res = await instance.patch("course/subtitle/video/"+contentID+"/addNote", {
      Note: note,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const FetchNote  = async (contentId) => {
  try {
    const res = await instance.get("course/subtitle/video/"+contentId+"/getNote");
    return res.data;
  }catch (err) {
    console.log(err);
  }
}

export const FetchContentVisit  = async (contentId , contentType) => {
  try {
    console.log(contentType);
    const res = await instance.get("course/subtitle/isVisited/"+contentId+"/"+contentType);
    return res.data;
  }catch (err) {
    console.log(err);
  }
}

export const UpdateContentVisit  = async (contentId , contentType) => {
  try {
    console.log(contentType);
    const res = await instance.patch("course/subtitle/isVisited/"+contentId+"/"+contentType);
    return res.data;
  }catch (err) {
    console.log(err);
  }
}
