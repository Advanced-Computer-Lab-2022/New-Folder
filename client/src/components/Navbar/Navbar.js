import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchSearchData } from "../../network";
import countries from "../../CountryNameCode.json";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

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

  const selectCountry = (e) => {
    e.preventDefault();
    setCurrentCountry(e);
  };
  console.log(countryList);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Explore</Link>
        </li>
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
          <Dropdown
            options={countryList}
            value={currentCountry}
            fluid
            selection
            onChange={(e) => selectCountry(e.value)}
            placeholder="Select an option"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
