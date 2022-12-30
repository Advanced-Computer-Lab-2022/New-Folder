import "./EarningsDropdown.css";
import NavDropdown from "react-bootstrap/NavDropdown";
const EarningsDropdown = (props) => {
  return (
    <div>
      {props.years?.length <= 1 ? (
        <p id="earningsDropdown">{props?.years[0]?.year ?? ""}</p>
      ) : (
        <NavDropdown
          title={<p id="earningsDropdown">{props?.years[0]?.year ?? ""}</p>}
          menuVariant="dark"
          align="end"
          drop="bottom"
          onSelect={(e) => props.setYear(e)}
        >
          {props.years.map((i) => (
            <NavDropdown.Item eventKey={i}>{i.year}</NavDropdown.Item>
          ))}
        </NavDropdown>
      )}
    </div>
  );
};

export default EarningsDropdown;
