import React, { useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import RatingCard from "../../components/RatingCard/RatingCard";
import Form from "react-bootstrap/Form";
import ViewerContexts from "../../constants/ViewerContexts.json";
import Button from "react-bootstrap/Button";
import "./CourseSummary.css";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import AddPromotion from "../Course/AddPromotion/AddPromotion";
import Container from "react-bootstrap/esm/Container";
function CourseSummary(props) {
  const [totalRating, setTotalRating] = useState(props.course.totalRating);
  let Stars = useMemo(() => {
    return () => (
      <ReactStars
        count={5}
        size={40}
        isHalf={true}
        activeColor="#ffd700"
        value={totalRating}
        edit={false}
      />
    );
  }, [totalRating]);
  return (
    <>
      <div id="courseSummaryContainer">
        <div id="courseSummaryFirstRow">
          <Row className="mb-0">
            <Col md="auto">
              <Image width={250} src={props.course.image} thumbnail />
            </Col>
            <Col>
              <Stack gap={1} id="courseHeader">
                <h2 id="courseTitle">{props.course.name}</h2>
                <h5 id="courseInstructorName">By: Instructor</h5>
                <div id="courseRatingStars">
                  <Stars />
                </div>
              </Stack>
            </Col>
            <Col></Col>
          </Row>
        </div>
        <div id="courseSummarySecondRow">
          <Row>
            <Col>
              <Stack gap={3}>
                <div id="priceEnroll">
                  {props.vc === ViewerContexts.guest ? (
                    <Button id="enrollButton" variant="dark">
                      Enroll
                    </Button>
                  ) : (
                    <>
                      {props.vc === ViewerContexts.enrolledTrainee ? (
                        <Button id="goToCourse" variant="dark">
                          Go to course
                        </Button>
                      ) : null}
                    </>
                  )}
                </div>
                {props.vc !== ViewerContexts.nonEnrolledCorporateTrainee &&
                props.vc !== ViewerContexts.enrolledTrainee ? (
                  <h5 className="courseInfo">
                    <b>Price:</b> {props.price ?? ""}
                  </h5>
                ) : null}
                <h5 className="courseInfo">
                  <b>Total duration:</b> {props.duration ?? 0} hours
                </h5>
                <h5 className="courseInfo">
                  <strong>Subject:</strong> {props.course.subject ?? ""}
                </h5>
                <h5 className="courseInfo">
                  <strong>Summary:</strong>
                  <br /> {props.course.description ?? ""}
                </h5>
                <div id="addRating">
                  <RatingCard
                    courseId={props.courseId}
                    vc={props.vc}
                    totalRating={totalRating}
                    setTotalRating={setTotalRating}
                  />
                  {props.vc === ViewerContexts.author ? <AddPromotion /> : null}
                </div>
              </Stack>
            </Col>
            <Col>
              <div id="introVideo">
                {props.course.introVideo !== "" && (
                  <iframe
                    style={{
                      height: 300,
                      width: 500,
                      marginLeft: 175,
                      borderRadius: 8,
                    }}
                    src={props.course.introVideo}
                  ></iframe>
                )}
                {props.vc === ViewerContexts.author ? (
                  <Form onSubmit={props.uploadIntroVideo}>
                    <Container className="mt-4">
                      <Form.Group className="mt-3">
                        <Form.Control
                          type="text"
                          placeholder="Video url"
                          value={props.newVideo}
                          required
                          onChange={(e) => {
                            props.setNewVideo(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <div className="text-center">
                        <Button className="mt-3" type="submit">
                          Add video
                        </Button>
                      </div>
                    </Container>
                  </Form>
                ) : null}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default CourseSummary;
