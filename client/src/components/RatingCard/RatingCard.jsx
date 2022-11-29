import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ReactSession } from "react-client-session";
import { useState, useEffect } from "react";
import { addRating, deleteRating, fetchCourseDetails } from "../../network";
import ViewerContexts from "../../constants/ViewerContexts.json";
import ReactStars from "react-rating-stars-component";

function RatingCard(props) {
  const { courseId, vc } = props;
  const [totalRating, setTotalRating] = useState(0);
  const [traineeRating, setTraineeRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [isShown, setShown] = useState(false);
  const initializeRatings = async () => {
    const fetchedCourse = await fetchCourseDetails(courseId);
    setTotalRating(fetchedCourse.totalRating);
    setRatingsCount(fetchedCourse.ratings.length);
    for (let i = 0; i < fetchedCourse.ratings.length; i++) {
      if (
        fetchedCourse.ratings[i].trainee ??
        "" === ReactSession.get("userId")
      ) {
        setTraineeRating(fetchedCourse.ratings[i].rating);
      }
    }
  };
  useEffect(() => {
    initializeRatings();
  }, []);
  const rate = async (newRating) => {
    setTraineeRating(newRating);
    const newTotalRating =
      (totalRating * ratingsCount + newRating) / (ratingsCount + 1);
    setTotalRating(newTotalRating);
    setRatingsCount(ratingsCount + 1);
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
      setTraineeRating(0);
      setRatingsCount(ratingsCount - 1);
      await deleteRating({ courseId: courseId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {vc === ViewerContexts.enrolledTrainee ? (
        <>
          <h1>{totalRating}</h1>
          <h1>{traineeRating}</h1>
          {traineeRating !== 0 ? (
            <>
              <h1>Course rating:</h1>
              <ReactStars
                count={5}
                size={50}
                isHalf={true}
                activeColor="#ffd700"
                value={totalRating}
                edit={false}
              />
              <h1>Your course rating:</h1>
              <ReactStars
                count={5}
                size={50}
                isHalf={true}
                activeColor="#ffd700"
                value={traineeRating}
                edit={false}
              />
              <Button onClick={() => removeRating()}>Delete rating</Button>
            </>
          ) : (
            <>
              <h1>Course rating:</h1>
              <ReactStars
                count={5}
                size={50}
                isHalf={true}
                activeColor="#ffd700"
                value={totalRating}
                edit={false}
              />
              {isShown ? (
                <ReactStars
                  count={5}
                  size={50}
                  isHalf={true}
                  activeColor="#ffd700"
                  value={traineeRating}
                  onChange={(rating) => rate(rating)}
                />
              ) : null}
              {isShown ? (
                <Button
                  onClick={() => {
                    setShown(false);
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShown(true);
                  }}
                >
                  Add rating
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        <ReactStars
          count={5}
          size={50}
          isHalf={true}
          activeColor="#ffd700"
          value={totalRating}
          edit={false}
        />
      )}
    </>
  );
}

export default RatingCard;
