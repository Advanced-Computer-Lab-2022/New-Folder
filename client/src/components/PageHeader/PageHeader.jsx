import "./PageHeader.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PageHeader = (props) => {
  return (
    <Row className="mb-3" id="pageHeaderBackground">
      <Col md={10} id="pageNameCol">
        <h3>{props.pageName}</h3>
      </Col>
      {props.extra ? <Col>{props.extra}</Col> : null}
    </Row>
  );
};

export default PageHeader;
