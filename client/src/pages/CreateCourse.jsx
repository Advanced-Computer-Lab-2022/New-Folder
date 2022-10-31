import { useState } from "react";
import { postCourse } from "../network";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import CountryCurrency from "iso-country-currency";
import ReactCountryFlag from "react-country-flag";

const countries = CountryCurrency.getAllISOCodes();

function CreateCourse() {
  const [data, setData] = useState({
    name: "",
    field: "",
    description: "",
    magnitude: "",
    currency: "EGP",
  });
  const navigate = useNavigate();
  const { name, field, description, magnitude, currency } = data;
  const onSubmit = (e) => {
    console.log(data);
    postCourse(data);
    e.preventDefault();
    navigate("/");
  };

  const onChange = (e) => {
    console.log(name);
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSelectedCurrency = (currencyAbbrev) => {
    currency = currencyAbbrev;
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          placeholder="Enter your name"
          onChange={onChange}
        />
        <br></br>
        <input
          type="text"
          id="field"
          name="field"
          value={field}
          placeholder="Enter your field"
          onChange={onChange}
        />
        <br></br>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          placeholder="Enter your description"
          onChange={onChange}
        />
        <br></br>
        <input
          type="text"
          id="magnitude"
          name="magnitude"
          value={magnitude}
          placeholder="Enter your magnitude"
          onChange={onChange}
        />
        <br></br>
        <Form.Select
          id="currency"
          name="currency"
          onChange={(e) => (currency = e.target.value)}
        >
          {countries.map((country) => (
            <option selected={country.currency === currency} value={currency}>
              <ReactCountryFlag countryCode={country.code} svg />
              {country.countryName + " (" + country.currency + ")"}
            </option>
          ))}
        </Form.Select>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateCourse;
