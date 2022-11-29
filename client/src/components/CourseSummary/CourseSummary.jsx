import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import RatingCard from "../../components/RatingCard/RatingCard";
import Form from "react-bootstrap/Form";
import ViewerContexts from "../../constants/ViewerContexts.json";
import Button from "react-bootstrap/Button";

function CourseSummary(props) {
  return (
    <>
      <Row id="courseCardContainer">
        <Col md={2}>
          <Image width={250} src={props.course.image} thumbnail />
        </Col>
        <Col>
          <Row>
            <h1 id="courseName">{props.course.name}</h1>
          </Row>
          <Row>
            <Col>
              <Stack gap={4} id="courseInfo">
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>{props.course.reviews?.length ?? 0} reviews</h3>
                  </Stack>
                </div>
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>{props.course.subtitles?.length ?? 0} subtitles</h3>
                  </Stack>
                </div>
                {props.vc !== ViewerContexts.nonEnrolledCorporateTrainee &&
                props.vc !== ViewerContexts.enrolledTrainee ? (
                  <div id="courseRating">
                    <Stack direction="horizontal" gap={3}>
                      <h3>Price: {props.price ?? 0}</h3>
                    </Stack>
                  </div>
                ) : null}
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <RatingCard courseId={props.courseId} vc={props.vc} />
                  </Stack>
                </div>
                {props.vc === ViewerContexts.guest ? (
                  <Button>Enroll</Button>
                ) : null}
              </Stack>
            </Col>
            <Col>
              <Stack>
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>Total duration: {props.duration ?? 0} hours</h3>
                  </Stack>
                </div>
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>Subject: {props.course.subject ?? ""}</h3>
                  </Stack>
                </div>
                <div id="courseRating">
                  <Stack direction="horizontal" gap={3}>
                    <h3>Summary: {props.course.description ?? ""}</h3>
                  </Stack>
                </div>
                <div id="introVideo">
                  {props.course.introVideo !== "" && (
                    <iframe
                      style={{ height: 200, width: "100%" }}
                      src={props.course.introVideo}
                    ></iframe>
                  )}
                  {props.vc === ViewerContexts.author ? (
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeHolder="Upload Course Preview"
                        value={props.newVideo}
                        onChange={(e) => {
                          props.setNewVideo(e.target.value);
                        }}
                      ></Form.Control>
                      <Button
                        onClick={(e) => {
                          props.uploadIntroVideo();
                        }}
                      >
                        upload
                      </Button>
                    </Form.Group>
                  ) : null}
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
