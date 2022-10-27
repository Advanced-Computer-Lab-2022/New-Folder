import axios from "axios";

//maximum time elapses before dropping the request
const MAX_TIMEOUT = 60000;

const baseURI = "http://localhost:8080/";

export const fetchExploreData = async () => {
  const res = await axios.get(baseURI, {
    timeout: MAX_TIMEOUT,
  });
  console.log(res.data);
  return res.data;
};

export const postCourse = async (data) => {
  const res = await axios.post(`${baseURI}instructor/createCourse`, data);
  console.log(res.data);
  return res.data;
};

export const postInstructor = async (data) => {
  const res = await axios.post(`${baseURI}admin/addInstructor`, data);
  console.log(res.data);
  return res.data;
};

export const postCorporateTrainee = async (data) => {
  const res = await axios.post(`${baseURI}admin/addCorporateTrainee`, data);
  console.log(res.data);
  return res.data;
};

export const postAddadmin = async (data) => {
  const res = await axios.post(`${baseURI}admin/addAdmin`, data);
  console.log(res.data);
  return res.data;
};

export const postAddInstructor = async (data) => {
  const res = await axios.post(`${baseURI}admin/addInstructor`, data);
  console.log(res.data);
  return res.data;
};


export const postAddCorporateTrainee = async (data) => {
  const res = await axios.post(`${baseURI}admin/addCorporateTrainee`, data);
  console.log(res.data);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axios.post(`${baseURI}login`, loginData);
  return res;
};
