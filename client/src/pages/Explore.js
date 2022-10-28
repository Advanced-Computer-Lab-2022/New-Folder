import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard/CourseCard";
import { fetchExploreData } from "../network";

const Explore = () => {
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    try {
      const fetchedCourses = await fetchExploreData();
      setCourses(fetchedCourses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul>
      {courses.map((course) => (
        <CourseCard course={course}></CourseCard>
      ))}
    </ul>
  );
};

export default Explore;
