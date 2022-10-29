import axios from "axios";
import countryCurrency from "./CountryCurrency.json";

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

export const getPrice = async (price, country) => {
  const rates = await axios.get("https://api.exchangerate.host/latest");
  const currCurrency = countryCurrency.country_currency[country];
  const courseCurrency = price.currency;
  var magnitude = price.magnitude;
  const ratio =
    rates.data.rates[currCurrency] / rates.data.rates[courseCurrency];
  return magnitude * ratio + " " + currCurrency;
};
