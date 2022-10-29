import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { fetchSearchData } from "../../network";
import countries from "../../CountryNameCode.json";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { countries } from "country-list-json";

const countryList = Object.keys(countries.country_name_code);
const Navbar = (props) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCountry, setCurrentCountry] = useState("Egypt");
  const submit = async (e) => {
    e.preventDefault();
    try {
      const searchResults = await fetchSearchData({ query: searchQuery });
      props.setSearchResults(searchResults);
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Explore</Link>
        </li>
        {ReactSession.get("userType") === "instructor" ? (
          <li>
            <Link to="/myCourses">myCourses</Link>
          </li>
        ) : null}
        <li>
          <form onSubmit={submit}>
            <input
              type="text"
              value={searchQuery}
              placeholder="search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">search</button>
          </form>
        </li>
        <li>
          <select
            id="country"
            name="country"
            onChange={(e) => props.setCountry(e.target.value)}
          >
            {countries.map((country) => (
              <option
                selected={country.code === ReactSession.get("country")}
                value={country.code}
              >
                {country.name}
              </option>
            ))}
          </select>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
