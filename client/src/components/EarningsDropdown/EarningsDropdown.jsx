import "./EarningsDropdown.css";
import NavDropdown from "react-bootstrap/NavDropdown";
const EarningsDropdown = (props) => {
  return (
    <div id="earningsDropdown">
      {props.years?.length <= 1 ? (
        <h3>{props?.years[0]?.year ?? ""}</h3>
      ) : (
        <NavDropdown
          title={props?.years[0]?.year ?? ""}
          menuVariant="dark"
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
