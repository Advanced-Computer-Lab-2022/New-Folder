import React, { useMemo } from "react";
import { Stack } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import ViewerContexts from "../../../constants/ViewerContexts.json";

function CourseHeader(props) {
  const { totalRating, name, vc, instructorName, instructorId, ratingsCount } =
    props;
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
    <Stack gap={1} id="courseHeader">
      <h2 id="courseTitle">{name}</h2>
      <h5 id="courseInstructorName">
        By:{" "}
        <a
          id="courseInstructorNameLink"
          href={
            vc === ViewerContexts.author
              ? "/myProfile"
              : `/viewInstructorProfile/${
                  vc === ViewerContexts.enrolledTrainee
                }/${instructorId}`
          }
        >
          {instructorName ?? "Instructor"}
        </a>
      </h5>
      <div id="courseRatingStars">
        <Stars />
        <h6 id="ratingsCount">
          ({ratingsCount} {ratingsCount == 1 ? "rating" : "rating"})
        </h6>
      </div>
    </Stack>
  );
}

export default CourseHeader;
