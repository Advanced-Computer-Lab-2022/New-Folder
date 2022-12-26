import React, { useMemo } from "react";
import { Stack } from "react-bootstrap";
import ProgressBar from "../../CourseSummary/ProgressBar/ProgressBar";
import ReactStars from "react-rating-stars-component";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import "./CourseHeader.css";
function CourseHeader(props) {
  const {
    totalRating,
    name,
    vc,
    instructorName,
    instructorId,
    ratingsCount,
    subContents,
    subtitles,
    percentage,
    setPercentage,
    setVc,
    courseId,
    setLoading,
    courseName,
  } = props;
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
    <Stack gap={1} id="courseHeader" direction="vertical">
      <h2>{name}</h2>
      <h5>
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
      <div id="courseHeaderStarsContainer">
        <Stars />
        <h6 id="courseHeaderRatingCount">
          &nbsp;&nbsp;({ratingsCount} {ratingsCount == 1 ? "rating" : "rating"})
        </h6>
      </div>
      <div className="course-progress-bar">
        {(vc === ViewerContexts.enrolledTrainee ||
          vc === ViewerContexts.refundingTrainee) && (
          <ProgressBar
            subContents={subContents}
            subtitles={subtitles}
            percentage={percentage}
            setPercentage={setPercentage}
            vc={vc}
            setVc={setVc}
            courseId={courseId}
            setLoading={setLoading}
            courseName={courseName}
          />
        )}
      </div>
    </Stack>
  );
}

export default CourseHeader;
