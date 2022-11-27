import "./ProfileCard.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import { BsStarFill, BsPlayCircle, BsFillPatchCheckFill } from "react-icons/bs";

const ProfileCard = (props) => {
  const { name, img } = props;
  return (
    <Row id="profileCardContainer">
      <Col md={2}>
        <Image width={250} src={img} thumbnail />
      </Col>
      <Col>
        <Stack gap={4} id="profileInfo">
          <h1 id="profileName">{name}</h1>
          <div id="profileRating">
            <Stack direction="horizontal" gap={3}>
              <BsStarFill size={40} />
              <h3>4.5 rating</h3>
            </Stack>
          </div>
          <div id="profileRating">
            <Stack direction="horizontal" gap={3}>
              <BsFillPatchCheckFill size={40} />
              <h3>400 reviews</h3>
            </Stack>
          </div>
          <div id="profileRating">
            <Stack direction="horizontal" gap={3}>
              <BsPlayCircle size={40} />
              <h3>50 courses</h3>
            </Stack>
          </div>
        </Stack>
      </Col>
    </Row>
  );
};

export default ProfileCard;
