import "./ProfileCard.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import { BsBriefcaseFill, BsStarFill, BsPlayCircleFill } from "react-icons/bs";

const ProfileCard = (props) => {
  const { name, img, rating, about, coursesCount, ratingNo } = props;
  return (
    <Row id="profileCardContainer">
      <Col md={2}>
        <Image width={250} src={img} thumbnail />
      </Col>
      <Col>
        <Stack gap={4} id="profileInfo">
          <h1 className="viewProfileItem">{name}</h1>
          <div className="viewProfileItem">
            <Stack direction="horizontal" gap={3}>
              <BsBriefcaseFill size={30} />
              <h4>{about}</h4>
            </Stack>
          </div>
          <div className="viewProfileItem">
            <Stack direction="horizontal" gap={3}>
              <BsStarFill size={35} />
              <Stack direction="horizontal" gap={2}>
                <h4>{rating} rating</h4>
                <h6>({ratingNo} ratings)</h6>
              </Stack>
            </Stack>
          </div>
          <div className="viewProfileItem">
            <Stack direction="horizontal" gap={3}>
              <BsPlayCircleFill size={35} />
              <h4>{coursesCount} courses</h4>
            </Stack>
          </div>
        </Stack>
      </Col>
    </Row>
  );
};

export default ProfileCard;
