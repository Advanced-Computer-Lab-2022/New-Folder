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

export const fetchSearchData = async (query) => {
  const res = await axios.post(`${baseURI}search`, query);
  console.log(res.data);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axios.post(`${baseURI}login`, loginData);
  return res;
};
