import React from "react";
import "./CourseSummary.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ViewerContexts from "../../constants/ViewerContexts.json";
import { updateIntroVideo } from "../../network";

import {
  BsStarFill,
  BsPlayCircle,
  BsFillPatchCheckFill,
  BsCash,
  BsClockFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import { useState, useEffect } from "react";

function CourseSummary(props) {
  const { course, setCourse, price, vc } = props;
  const [newVideo, setNewVideo] = useState();
  const uploadIntroVideo = async () => {
    try {
      const data = { courseId: course._id, videoLink: newVideo };
      const newCourse = await updateIntroVideo(data);
      setCourse(newCourse);
      setNewVideo("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row id="courseCardContainer">
        <Col md={2}>
          <Image width={250} src={course.image} thumbnail />
        </Col>
        <Col>
          <Row>
            <h1 id="courseName">{course.name}</h1>
          </Row>
          <Row>
            <Col>
              <Stack gap={4} id="courseInfo">
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>Rating: {course.rating ?? 0}</h3>
                  </Stack>
                </div>
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>{course.reviews?.length ?? 0} reviews</h3>
                  </Stack>
                </div>
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>{course.subtitles?.length ?? 0} subtitles</h3>
                  </Stack>
                </div>
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>Price: {price ?? 0}</h3>
                  </Stack>
                </div>
              </Stack>
            </Col>
            <Col>
              <Stack gap={4}>
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>Total duration: {props.duration ?? 0} hours</h3>
                  </Stack>
                </div>
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>Subject: {course.subject ?? ""}</h3>
                  </Stack>
                </div>
                <div id="introVideo">
                  {course.introVideo !== "" && (
                    <iframe
                      style={{ height: 200, width: "100%" }}
                      src={course.introVideo}
                    ></iframe>
                  )}
                  {
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeHolder="Upload Course Preview"
                        value={newVideo}
                        onChange={(e) => {
                          setNewVideo(e.target.value);
                        }}
                      ></Form.Control>
                      <Button
                        onClick={(e) => {
                          uploadIntroVideo();
                        }}
                      >
                        upload
                      </Button>
                    </Form.Group>
                  }
                </div>
              </Stack>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default CourseSummary;
