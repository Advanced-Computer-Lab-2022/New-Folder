import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { getPrice, fetchCourseDetails } from "../../network";
import SubtitleCard from "../../components/SubtitleCard/SubtitleCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { getViewerContext } from "../../utils/viewerContext";
const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [price, setPrice] = useState("");
  const [vc, setVc] = useState("");
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
  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    fetchPrice();
  }, [ReactSession.get("country"), course]);

  return (
    <div>
      <h1>You are viewing this page as a {vc}</h1>
      <h1>{course.name}</h1>
      <img src={course.image}></img>
      <h3>{course.subject}</h3>
      <h3>{"price" + ": " + price}</h3>
      <p>
        Description : <span>{course.description}</span>
      </p>
      <p> Total Number of Hours : {course.duration} hrs</p>

      <h6>Course Content :</h6>
      <ul>
        {subtitles.map((subtitleId) => (
          <SubtitleCard subtitleId={subtitleId} />
        ))}
      </ul>

      <h4>Reviews : </h4>
      <ul>
        {reviews.map((review) => (
          <ReviewCard review={review} />
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
