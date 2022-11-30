import React from "react";
import Button from "react-bootstrap/Button";

import Stack from "react-bootstrap/Stack";

import { ReactSession } from "react-client-session";
import { useState, useEffect, useMemo } from "react";
import { addRating, deleteRating, fetchCourseDetails } from "../../network";
import ViewerContexts from "../../constants/ViewerContexts.json";
import ReactStars from "react-rating-stars-component";
import "./RatingCard.css";
function RatingCard(props) {
  const { courseId, vc, totalRating, setTotalRating } = props;
  const [traineeRating, setTraineeRating] = useState(null);
  const [ratingsCount, setRatingsCount] = useState(0);
  const initializeRatings = async () => {
    const fetchedCourse = await fetchCourseDetails(courseId);
    setTotalRating(fetchedCourse.totalRating);
    setRatingsCount(fetchedCourse.ratings.length);
    for (let i = 0; i < fetchedCourse.ratings.length; i++) {
      if (fetchedCourse.ratings[i].trainee === ReactSession.get("userId")) {
        console.log(
          fetchedCourse.ratings[i].trainee + " " + ReactSession.get("userId")
        );
        setTraineeRating(fetchedCourse.ratings[i].rating);
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
          value={traineeRating ?? 0}
          edit={true}
          onChange={(rating) => rate(rating)}
        />
      </div>
    );
  }, [traineeRating]);
  useEffect(() => {
    initializeRatings();
  }, []);
  const rate = async (newRating) => {
    if (traineeRating == null) {
      const newTotalRating =
        (totalRating * ratingsCount + newRating) / (ratingsCount + 1);
      setTotalRating(newTotalRating);
      setRatingsCount(ratingsCount + 1);
    } else {
      const newTotalRating =
        (totalRating * ratingsCount + newRating - traineeRating) / ratingsCount;
      setTotalRating(newTotalRating);
    }
    setTraineeRating(newRating);
    await addRating({
      courseId: courseId,
      rating: newRating,
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
      setTraineeRating(null);
      setRatingsCount(ratingsCount - 1);
      await deleteRating({ courseId: courseId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {vc === ViewerContexts.enrolledTrainee ? (
        <Stack direction="horizontal">
          <div id="courseStars">
            <h4>
              <b>Your course rating:</b>
            </h4>
            <AddRatingStars />
          </div>
          {traineeRating !== null ? (
            <Button
              onClick={() => removeRating()}
              id="deleteRating"
              variant="danger"
            >
              Delete rating
            </Button>
          ) : null}
        </Stack>
      ) : null}
    </div>
  );
}

export default RatingCard;
