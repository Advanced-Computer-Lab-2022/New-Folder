import axios from "axios";
import countryCurrency from "./constants/CountryCurrency.json";
import { ReactSession } from "react-client-session";

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

export const fetchcCourseDetils = async (id) => {
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

// Change password
export const changePassword = async (data) => {
  const res = await instance.post("/trainee/changePassword", data);
  return res;
};

// send password reset link
export const sendPasswordResetLink = async (email) => {
  const res = await instance.post("/sendPasswordResetLink", email);
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
export const rateInstructor = async (instructorID, data) => {
  const res = await instance.post("/trainee/rateInstructor", {
    params: {
      instructorID: instructorID,
    },
    body: data,
    timeout: MAX_TIMEOUT,
  });
  return res;
};

// get MyProfile for instructor
export const getMyProfile = async (instructorID) => {
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
