import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { getPrice, fetchCourseDetails } from "../../network";
import SubtitleCard from "../../components/SubtitleCard/SubtitleCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { getViewerContext } from "../../utils/viewerContext";
import CourseSummary from "../../components/CourseSummary/CourseSummary";
const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [price, setPrice] = useState("");
  const [vc, setVc] = useState("");
  const [durationMap, setDurationMap] = useState(new Map());
  const [duration, setDuration] = useState(0);
  const fetchCourse = async () => {
    try {
      const fetchedCourse = await fetchCourseDetails(courseId);
      const fetchedVc = getViewerContext(fetchedCourse);
      setVc(fetchedVc);
      setCourse(fetchedCourse);
      setReviews(fetchedCourse.reviews);
      setSubtitles(fetchedCourse.subtitles);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPrice = async () => {
    try {
      const fetchedPrice = await getPrice(course.price);
      setPrice(fetchedPrice);
    } catch (err) {
      console.log(err);
    }
  };

  const claculateDuration = () => {
    if (durationMap.size > 0) {
      let d = 0;
      for (let [key, value] of durationMap) {
        if (!isNaN(value)) {
          d = parseInt(d) + parseInt(value ?? 0);
        }
      }
      setDuration(d);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    fetchPrice();
  }, [ReactSession.get("country"), course]);

  useEffect(() => {
    claculateDuration();
  },[durationMap])

  return (
    <div>
      <CourseSummary
        course={course}
        price={price}
        vc={vc}
        duration={duration}
      />
      <ul>
        {subtitles.map((subtitleId) => (
          <SubtitleCard
            subtitleId={subtitleId}
            durationMap={durationMap}
            setDurationMap={setDurationMap}
          />
        ))}
      </ul>

      <h4>Reviews: </h4>
      <ul>
        {reviews.map((review) => (
          <ReviewCard review={review} />
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
