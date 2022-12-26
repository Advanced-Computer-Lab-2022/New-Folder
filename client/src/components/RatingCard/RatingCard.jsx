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

import "./RatingCard.css";
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
  const rate = async () => {
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
    props.setReviews(newReviews);
    setTraineeRating(addedRating);
    setTraineeReview(addedReview);
    setNewRating(null);
    setNewReview(null);
    setEditing(false);
    await addRating({
      courseId: courseId,
      rating: addedRating ?? 0,
      review: addedReview,
    });
  };

  const deleteReview = async () => {
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
    setRatingsCount(ratingsCount - 1);
    props.setReviews(newReviews);
    setTraineeRating(null);
    setTraineeReview(null);
    setEditing(false);
    setNewRating(null);
    setNewReview(null);
    await deleteRating({ courseId: courseId });
  };
  const cancel = async () => {
    setEditing(false);
    setNewRating(null);
    setNewReview(null);
  };
  return (
    <div id="rateCourseButton">
      {vc === ViewerContexts.enrolledTrainee ? (
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
                    className="rateCourseFormButton"
                  >
                    Close
                  </Button>
                  {traineeRating != null ? (
                    <Button
                      onClick={() => deleteReview()}
                      className="rateCourseFormButton"
                      variant="danger"
                    >
                      Delete review
                    </Button>
                  ) : null}

                  <Button
                    onClick={() => rate()}
                    className="rateCourseFormButton"
                  >
                    Submit
                  </Button>
                </div>
              </Stack>
            </Modal>
          </>
          {traineeRating != null ? (
            <Button onClick={() => setEditing(true)}>Edit your review</Button>
          ) : (
            <Button onClick={() => setEditing(true)}>Review course</Button>
          )}
        </>
      ) : null}
    </div>
  );
}
export default RatingCard;
