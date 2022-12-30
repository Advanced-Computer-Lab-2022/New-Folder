import "./CountrySelector.css";
import { ReactSession } from "react-client-session";
import { countries } from "country-list-json";
import ReactCountryFlag from "react-country-flag";
import { NavDropdown } from "react-bootstrap";

const CountrySelector = (props) => {
  return (
    <NavDropdown
      id="navDropdown"
      className="text-light navDropdown"
      menuVariant="dark"
      title={
        <h2 className="ms-3 me-4">
          <ReactCountryFlag countryCode={ReactSession.get("country")} svg />
        </h2>
      }
      onSelect={(e) => props.setCountry(e)}
      scrollable
    >
      {countries.map((country) => (
        <NavDropdown.Item eventKey={country.code}>
          <ReactCountryFlag countryCode={country.code} svg />
          {" " + country.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default CountrySelector;
