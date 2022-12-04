import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { ReactSession } from "react-client-session";
import { useState, useEffect, useMemo } from "react";
import { addRating, deleteRating, fetchCourseDetails } from "../../network";
import ViewerContexts from "../../constants/ViewerContexts.json";
import ReactStars from "react-rating-stars-component";
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
    const addedRating = newRating ?? traineeRating;
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
        }
        found = true;
      } else {
        newReviews.push(props.reviews[i]);
      }
    }
    if (!found && addedReview && addedReview !== "") {
      newReviews.push({
        traineeName: ReactSession.get("userName"),
        traineeId: ReactSession.get("userId"),
        review: addedReview,
        rating: addedRating,
      });
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
  const removeRating = async () => {
    try {
      if (ratingsCount - 1 == 0) {
        setTotalRating(0);
      } else {
        const newTotalRating =
          (totalRating * ratingsCount - traineeRating) / (ratingsCount - 1);
        setTotalRating(newTotalRating);
      }
      let newReviews = [];
      for (let i = 0; i < props.reviews.length; i++) {
        if (props.reviews[i].traineeId !== ReactSession.get("userId")) {
          newReviews.push(props.reviews[i]);
        }
      }
      props.setReviews(newReviews);
      setTraineeRating(null);
      setTraineeReview(null);
      setNewRating(null);
      setNewReview(null);
      setRatingsCount(ratingsCount - 1);
      setEditing(false);
      await deleteRating({ courseId: courseId });
    } catch (err) {
      console.log(err);
    }
  };
  const cancel = async () => {
    setEditing(false);
    setNewRating(null);
    setNewReview(null);
  };
  return (
    <div>
      {vc === ViewerContexts.enrolledTrainee ? (
        <Stack direction="horizontal">
          {traineeRating !== null && !editing ? (
            <>
              <Stack direction="vertical">
                <div id="courseStars">
                  <h5>
                    <b>Your course rating</b>
                  </h5>
                  <AddRatingStars />
                </div>
                <div id="courseStars">
                  <h5>
                    <b>Your course review</b>
                  </h5>
                  <p>{traineeReview}</p>
                </div>
                <Button
                  onClick={() => removeRating()}
                  id="deleteRating"
                  variant="danger"
                >
                  Delete rating
                </Button>
                <Button onClick={() => setEditing(true)}>Edit rating</Button>
              </Stack>
            </>
          ) : (
            <>
              {editing ? (
                <>
                  <Stack direction="vertical">
                    <div id="courseStars">
                      <h5>
                        <b>Rate the course</b>
                      </h5>
                      <AddRatingStars />
                    </div>
                    <div id="courseStars">
                      <Form.Group as={Col}>
                        <Form.Control
                          type="text"
                          placeholder="Your review"
                          value={newReview ?? traineeReview}
                          onChange={(e) => setNewReview(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <Button onClick={() => rate()} id="deleteRating">
                      Save changes
                    </Button>
                    <Button onClick={() => cancel()} variant="secondary">
                      Cancel
                    </Button>
                  </Stack>
                </>
              ) : (
                <Button onClick={() => setEditing(true)}>Add rating</Button>
              )}
            </>
          )}
        </Stack>
      ) : null}
    </div>
  );
}
export default RatingCard;
