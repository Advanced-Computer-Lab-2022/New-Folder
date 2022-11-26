import React from "react";
import "./CourseSummary.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import { BsStarFill, BsPlayCircle, BsFillPatchCheckFill } from "react-icons/bs";

function CourseSummary(props) {
  const { course, price } = props;
  return (
    <>
      <Row id="courseCardContainer">
        <Col md={2}>
          <Image width={250} src={course.image} thumbnail />
        </Col>
        <Col>
          <Stack gap={4} id="courseInfo">
            <h1 id="courseName">{course.name}</h1>
            <div id="courseRating">
              <Stack direction="horizontal" gap={3}>
                <BsStarFill size={40} />
                <h3>{course.rating ?? ""} rating</h3>
              </Stack>
            </div>
            <div id="courseRating">
              <Stack direction="horizontal" gap={3}>
                <BsFillPatchCheckFill size={40} />
                <h3>{course.reviews?.length ?? 0} reviews</h3>
              </Stack>
            </div>
            <div id="courseRating">
              <Stack direction="horizontal" gap={3}>
                <BsPlayCircle size={40} />
                <h3>{course.subtitles?.length ?? 0} subtitles</h3>
              </Stack>
            </div>
          </Stack>
        </Col>
      </Row>
    </>
  );
}

export default CourseSummary;
