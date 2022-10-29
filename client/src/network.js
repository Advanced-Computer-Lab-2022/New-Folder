import axios from "axios";
import countryCurrency from "./CountryCurrency.json";
import { ReactSession } from "react-client-session";
//maximum time elapses before dropping the request
const MAX_TIMEOUT = 60000;

const baseURI = "http://localhost:8080/";

// Explore
export const fetchExploreData = async () => {
  const res = await axios.get(baseURI, {
    timeout: MAX_TIMEOUT,
  });
  return res.data;
};

// Create Course
export const postCourse = async (data) => {
  const res = await axios.post(`${baseURI}instructor/createCourse`, data);
  console.log(res.data);
  return res.data;
};

// Add Admin
export const postAddadmin = async (data) => {
  const res = await axios.post(`${baseURI}admin/addAdmin`, data);
  console.log(res.data);
  return res.data;
};

// Add Instructor
export const postAddInstructor = async (data) => {
  const res = await axios.post(`${baseURI}admin/addInstructor`, data);
  console.log(res.data);
  return res.data;
};

// Add Corporate Trainee
export const postAddCorporateTrainee = async (data) => {
  const res = await axios.post(`${baseURI}admin/addCorporateTrainee`, data);
  console.log(res.data);
  return res.data;
};

// Search results
export const fetchSearchData = async (query) => {
  const res = await axios.post(`${baseURI}search`, query);
  return res.data;
};

// Login
export const login = async (loginData) => {
  const res = await axios.post(`${baseURI}login`, loginData);
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
  return magnitude * ratio + " " + currCurrency;
};

export const fetchMyCourses = async () => {
  const res = await axios.get(`${baseURI}myCourses`, {
    timeout: MAX_TIMEOUT,
  });
  return res.data;
};
