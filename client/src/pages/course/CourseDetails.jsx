import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { getPrice, fetchCourseDetails} from "../../network";
import SubtitleCard from "../../components/SubtitleCard/SubtitleCard";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [price, setPrice] = useState();

  const fetchCourse = async () => {
    try {
      const fetchedCourse = await fetchCourseDetails(courseId);
      setCourse(fetchedCourse);
      console.log(fetchedCourse.subtitles);
      setReviews(fetchedCourse.reviews);
      setSubtitles(fetchedCourse.subtitles);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPrice = async () => {
    try {
      const fetchedPrice = await getPrice(course.price);
      console.log(fetchedPrice);
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
      <h1>{course.name}</h1>
      <img src={course.image}></img>
      <h3>{course.subject}</h3>
      <h3>{"price" + ": " + price}</h3>
      <p>
        Description : <span>{course.description}</span>
      </p>
      <p> Total Number of Hours : {course.duration} hrs</p>

      <>
        <h6>Course Content :</h6>
        <ul>
        {subtitles.map((subtitleId) => (
          <SubtitleCard subtitleId={subtitleId} />
        ))}
        </ul>
      </>
      <h4>Reviews : </h4>
    </div>
  );
};

export default CourseDetails;
