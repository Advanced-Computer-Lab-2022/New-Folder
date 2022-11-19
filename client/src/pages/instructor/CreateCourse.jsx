import { useState } from "react";
import { postCourse } from "../../network";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import CountryCurrency from "iso-country-currency";

const countries = CountryCurrency.getAllISOCodes();

function CreateCourse() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");
  const [magnitude, setMagnitude] = useState("");
  const [currency, setCurrency] = useState("EGP");
  const [subtitle, setSubtitle] = useState("");
  const onSubmit = (e) => {
    const data = {
      name: name,
      field: field,
      description: description,
      magnitude: magnitude,
      currency: currency,
      subtitle: subtitle,
    };
    postCourse(data);
    e.preventDefault();
    navigate("/");
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
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          id="field"
          name="field"
          value={field}
          placeholder="Enter your field"
          onChange={(e) => setField(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          placeholder="Enter your description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={subtitle}
          placeholder="Enter course subtitle"
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          id="magnitude"
          name="magnitude"
          value={magnitude}
          placeholder="Enter your price magnitude"
          onChange={(e) => setMagnitude(e.target.value)}
        />
        <br></br>
        <Form.Select
          id="currency"
          name="currency"
          onChange={(e) => {
            console.log(e.target.value);
            setCurrency(e.target.value);
          }}
        >
          {countries.map((country) => (
            <option
              selected={country.currency === currency}
              value={country.currency}
            >
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
