import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { fetchSearchData } from "../../network";
import { countries } from "country-list-json";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
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
              <option selected={country.name === "Egypt"} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </li>
        <li>{ReactSession.get("country")}</li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
