import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { ReactSession } from "react-client-session";
import { useState, useEffect, useMemo } from "react";
import { addRating, fetchCourseDetails, deleteRating } from "../../network";
import ViewerContexts from "../../constants/ViewerContexts.json";
import ReactStars from "react-rating-stars-component";
import Modal from "react-bootstrap/Modal";
import { ImPencil } from "react-icons/im";
import "./RatingCard.css";
import { Spinner } from "react-bootstrap";
import SuccessFeedback from "../SuccessFeedback/SuccessFeedback";
import ErrorFeedback from "../ErrorFeedback/ErrorFeedback";
import { AiOutlinePlusCircle } from "react-icons/ai";
import colors from "../../colors.json";

function RatingCard(props) {
  const {
    courseId,
    vc,
    totalRating,
    setTotalRating,
    ratingsCount,
    setRatingsCount,
  } = props;
  const [traineeRating, setTraineeRating] = useState(null);
  const [traineeReview, setTraineeReview] = useState(null);
  const [newRating, setNewRating] = useState(null);
  const [newReview, setNewReview] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [msg, setMsg] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const initializeRatings = async () => {
    const fetchedCourse = await fetchCourseDetails(courseId);
    setTotalRating(fetchedCourse.totalRating);
    setRatingsCount(fetchedCourse.ratings.length);
    for (let i = 0; i < fetchedCourse.ratings.length; i++) {
      if (fetchedCourse.ratings[i].traineeId === ReactSession.get("userId")) {
        setTraineeRating(fetchedCourse.ratings[i].rating);
        setTraineeReview(fetchedCourse.ratings[i].review);
      }
    }
  };
  let AddRatingStars = useMemo(() => {
    return () => (
      <div id="starsWrapper">
        <ReactStars
          count={5}
          size={50}
          isHalf={true}
          activeColor="#ffd700"
          value={newRating ?? traineeRating ?? 0}
          edit={editing}
          onChange={(r) => setNewRating(r)}
        />
      </div>
    );
  }, [traineeRating, editing]);
  useEffect(() => {
    initializeRatings();
  }, []);
  let timeoutId;
  useEffect(() => {
    if (success || fail) {
      timeoutId = setTimeout(cancel, 3000);
    }
  }, [success, fail]);
  const rate = async () => {
    setSaveLoading(true);
    try {
      if (traineeRating == null) {
        const newTotalRating =
          (totalRating * ratingsCount + (newRating ?? 0)) / (ratingsCount + 1);
        setTotalRating(newTotalRating);
        setRatingsCount(ratingsCount + 1);
      } else {
        const newTotalRating =
          (totalRating * ratingsCount +
            (newRating ?? traineeRating) -
            traineeRating) /
          ratingsCount;
        setTotalRating(newTotalRating);
      }
      const addedReview = newReview ?? traineeReview;
      const addedRating = newRating ?? traineeRating ?? 0;
      let newReviews = [];
      let found = false;
      for (let i = 0; i < props.reviews.length; i++) {
        if (props.reviews[i].traineeId === ReactSession.get("userId")) {
          if (addedReview && addedReview !== "") {
            newReviews.push({
              traineeName: props.reviews[i].traineeName,
              traineeId: props.reviews[i].traineeId,
              review: addedReview,
              rating: addedRating,
            });
          } else {
            newReviews.push({
              traineeName: props.reviews[i].traineeName,
              traineeId: props.reviews[i].traineeId,
              review: props.reviews[i].review,
              rating: addedRating,
            });
          }
          found = true;
        } else {
          newReviews.push(props.reviews[i]);
        }
      }
      if (!found) {
        if (addedReview && addedReview !== "") {
          newReviews.push({
            traineeName: ReactSession.get("userName"),
            traineeId: ReactSession.get("userId"),
            review: addedReview,
            rating: addedRating,
          });
        } else {
          newReviews.push({
            traineeName: ReactSession.get("userName"),
            traineeId: ReactSession.get("userId"),
            review: null,
            rating: addedRating,
          });
        }
      }

      await addRating({
        courseId: courseId,
        rating: addedRating ?? 0,
        review: addedReview,
      });
      props.setReviews(newReviews);
      setTraineeRating(addedRating);
      setTraineeReview(addedReview);
      setNewRating(null);
      setNewReview(null);
      setSuccess(true);
      setMsg("Review submitted successfully!");
    } catch (err) {
      setFail(true);
    }
    setSubmitted(true);
    setSaveLoading(false);
  };

  const deleteReview = async () => {
    setDeleteLoading(true);
    try {
      if (ratingsCount > 1) {
        const newTotalRating =
          (totalRating * ratingsCount - traineeRating) / (ratingsCount - 1);
        setTotalRating(newTotalRating);
      } else {
        setTotalRating(0);
      }

      let newReviews = [];
      for (let i = 0; i < props.reviews.length; i++) {
        if (props.reviews[i].traineeId !== ReactSession.get("userId")) {
          newReviews.push(props.reviews[i]);
        }
      }
      await deleteRating({ courseId: courseId });
      setRatingsCount(ratingsCount - 1);
      props.setReviews(newReviews);
      setTraineeRating(null);
      setTraineeReview(null);
      setNewRating(null);
      setNewReview(null);
      setSuccess(true);
      setMsg("Review deleted successfully");
    } catch (err) {
      setFail(true);
    }
    setSubmitted(true);
    setDeleteLoading(false);
  };
  const cancel = async () => {
    clearTimeout(timeoutId);
    setEditing(false);
    setNewRating(null);
    setNewReview(null);
    setSuccess(false);
    setFail(false);
    setMsg(null);
  };
  return (
    <>
      {vc === ViewerContexts.enrolledTrainee ? (
        <div id="rateCourseButton">
          <>
            <>
              <Modal
                show={editing}
                onHide={() => setEditing(false)}
                size={"lg"}
                centered
              >
                <Modal.Header>
                  <Modal.Title>Review course</Modal.Title>
                </Modal.Header>
                {submitted ? (
                  <>
                    {success ? (
                      <SuccessFeedback msg={msg} />
                    ) : (
                      <>{fail ? <ErrorFeedback /> : null}</>
                    )}
                  </>
                ) : (
                  <>
                    {" "}
                    <Stack direction="vertical">
                      <div id="courseStars">
                        <AddRatingStars />
                      </div>
                      <div className="courseRatingForm">
                        <Form.Group as={Col}>
                          <Form.Control
                            as="textarea"
                            placeholder="Your review"
                            value={newReview ?? traineeReview}
                            onChange={(e) => setNewReview(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                      <div className="courseRatingForm" id="rateCourseFooter">
                        <Button
                          onClick={() => cancel()}
                          variant="secondary"
                          className="rateCourseFormButton greyBgHover"
                          disabled={saveLoading || deleteLoading}
                        >
                          Close
                        </Button>
                        {traineeRating != null ? (
                          <Button
                            onClick={() => deleteReview()}
                            className="rateCourseFormButton redBgHover"
                            disabled={saveLoading || deleteLoading}
                          >
                            {deleteLoading ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                {" Deleting..."}
                              </>
                            ) : (
                              <>{"Delete Review"}</>
                            )}
                          </Button>
                        ) : null}

                        <Button
                          onClick={() => rate()}
                          className="rateCourseFormButton blueBgHover"
                          disabled={saveLoading || deleteLoading}
                        >
                          {saveLoading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              {" Saving..."}
                            </>
                          ) : (
                            <>{"Submit"}</>
                          )}
                        </Button>
                      </div>
                    </Stack>
                  </>
                )}
              </Modal>
            </>
            {traineeRating != null ? (
              <h6
                style={{ marginTop: "7%", cursor: "pointer" }}
                onClick={() => {
                  setEditing(true);
                  setSubmitted(false);
                }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;Edit your review
                <ImPencil
                  color={colors.blue}
                  size={15}
                  style={{ marginBottom: 5, marginLeft: 5, cursor: "pointer" }}
                  onClick={() => {
                    setEditing(true);
                    setSubmitted(false);
                  }}
                />
              </h6>
            ) : (
              <h6
                style={{ marginTop: "9%", cursor: "pointer" }}
                onClick={() => {
                  setEditing(true);
                  setSubmitted(false);
                }}
              >
                <AiOutlinePlusCircle
                  color={colors.blue}
                  size={15}
                  style={{ marginBottom: 3, marginLeft: 7, cursor: "pointer" }}
                  onClick={() => {
                    setEditing(true);
                    setSubmitted(false);
                  }}
                />
                &nbsp;Add a review
              </h6>
            )}
          </>
        </div>
      ) : null}
    </>
  );
}
export default RatingCard;
