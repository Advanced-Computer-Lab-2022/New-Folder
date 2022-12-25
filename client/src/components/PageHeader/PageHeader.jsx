import "./PageHeader.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PageHeader = (props) => {
  return (
    <Row className="mb-3 yellowBg whiteTxt" id="pageHeaderBackground">
      <Col md="auto" id="pageNameCol">
        <h3>{props.pageName}</h3>
      </Col>
      {props.extra ? <Col>{props.extra}</Col> : null}
    </Row>
  );
};

export default PageHeader;
