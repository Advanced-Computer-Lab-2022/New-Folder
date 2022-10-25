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
