import "./PageHeader.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PageHeader = (props) => {
  return (
    <Row className="mb-3 blueBg whiteTxt" id="pageHeaderBackground">
      <Col md="auto" id="pageNameCol">
        <p id="pageName">{props.pageName}</p>
      </Col>
      {props.extra ? <Col id="pageExtraCol">{props.extra}</Col> : null}
    </Row>
  );
};

export default PageHeader;
