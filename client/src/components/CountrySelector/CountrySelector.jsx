import { ReactSession } from "react-client-session";
import { countries } from "country-list-json";
import ReactCountryFlag from "react-country-flag";
import { NavDropdown } from "react-bootstrap";

const CountrySelector = (props) => {
  return (
    <NavDropdown
      className="text-light"
      menuVariant="dark"
      title={<ReactCountryFlag countryCode={ReactSession.get("country")} svg />}
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
