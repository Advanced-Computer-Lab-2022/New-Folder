import React, { useEffect, useMemo } from "react";
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
import "react-day-picker/dist/style.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import {
  getYoutubeVideoID,
  totalDuration,
} from "../../utils/getVideoDurationUtils";
import ReportCourse from "../Course/ReportCourse/ReportCourse";
import RequestAccess from "../Course/RequestAccess/RequestAccess";

function CourseSummary(props) {
  const [totalRating, setTotalRating] = useState(null);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [validPromotion, setValidPromotion] = useState(false);
  const promotion = props.promotion;
  const setPromotion = props.setPromotion;
  const navigate = useNavigate();
  useEffect(() => {
    setTotalRating(props.course.totalRating);
  }, []);
  useEffect(() => {
    const startDate = new Date(promotion?.startDate).getTime();
    const endDate = new Date(promotion?.endDate).getTime();
    const now = Date.now();
    if (now <= endDate && now >= startDate && promotion?.percentage > 0) {
      setValidPromotion(true);
    } else {
      setValidPromotion(false);
    }
  }, [props.promotion]);
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
                <h5 id="courseInstructorName">
                  By:{" "}
                  <a
                    id="courseInstructorNameLink"
                    href={
                      props.vc === ViewerContexts.author
                        ? "/myProfile"
                        : `/viewInstructorProfile/${
                            props.vc === ViewerContexts.enrolledTrainee
                          }/${props.course.instructorInfo?.instructorId}`
                    }
                  >
                    {props.course.instructorInfo?.instructorName ??
                      "Instructor"}
                  </a>
                </h5>
                <div id="courseRatingStars">
                  <Stars />
                  <h6 id="ratingsCount">
                    ({ratingsCount} {ratingsCount == 1 ? "rating" : "rating"})
                  </h6>
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
                        <Button
                          id="goToCourse"
                          variant="dark"
                          onClick={() =>
                            navigate(
                              "/watch/" + props.courseId + "?sId=0&cId=0"
                            )
                          }
                        >
                          Go to course
                        </Button>
                      ) : (
                        <>
                          {[
                            ViewerContexts.pendingCorporateTrainee,
                            ViewerContexts.nonEnrolledCorporateTrainee,
                          ].includes(props.vc) ? (
                            <RequestAccess
                              vc={props.vc}
                              setVc={props.setVc}
                              course={props.course}
                            />
                          ) : null}
                        </>
                      )}
                    </>
                  )}
                </div>
                {props.vc !== ViewerContexts.nonEnrolledCorporateTrainee &&
                props.vc !== ViewerContexts.enrolledTrainee ? (
                  <>
                    {validPromotion ? (
                      <>
                        <h5 className="courseInfo">
                          <b>Price:</b>{" "}
                          <del>{props.price.split(" ")[0] ?? ""}</del>{" "}
                          {(
                            parseFloat(props.price.split(" ")[0]) *
                            (1 - promotion.percentage / 100)
                          ).toFixed(2)}{" "}
                          {props.price.split(" ")[1]}
                          {`(-${promotion.percentage}%)`}
                        </h5>
                      </>
                    ) : (
                      <h5 className="courseInfo">
                        <b>Price:</b> {props.price ?? ""}
                      </h5>
                    )}
                  </>
                ) : null}
                <h5 className="courseInfo">
                  <b>Total duration:</b> {totalDuration(props.duration)}
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
                    ratingsCount={ratingsCount}
                    setRatingsCount={setRatingsCount}
                    reviews={props.reviews}
                    setReviews={props.setReviews}
                  />
                  {props.vc === ViewerContexts.author ? (
                    <AddPromotion
                      promotion={promotion}
                      setPromotion={setPromotion}
                      courseId={props.course._id}
                    />
                  ) : null}
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
                      marginLeft: 190,
                      borderRadius: 8,
                    }}
                    src={
                      "https://www.youtube.com/embed/" +
                      getYoutubeVideoID(props.course.introVideo ?? "")
                    }
                  ></iframe>
                )}
                {props.vc === ViewerContexts.author ? (
                  <Form>
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
                          id="urlInput"
                        ></Form.Control>
                      </Form.Group>
                      <div className="text-center">
                        <Button id="addVideo" onClick={props.uploadIntroVideo}>
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
        {props.vc !== ViewerContexts.guest ? (
          <ReportCourse course={props.course} />
        ) : null}
      </div>
    </>
  );
}

export default CourseSummary;
