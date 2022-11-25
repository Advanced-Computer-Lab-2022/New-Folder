import "./ProfileCard.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";

const ProfileCard = (props) => {
  const { name, img } = props;
  return (
    <Row id="profileCardContainer">
      <Col md={3}>
        <Image width={350} src={img} thumbnail />
      </Col>
      <Col>
        <Stack gap={3} id="profileInfo">
          <h1 id="profileName">{name}</h1>
        </Stack>
      </Col>
    </Row>
  );
};

export default ProfileCard;
