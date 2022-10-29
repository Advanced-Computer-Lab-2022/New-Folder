import { useState, useEffect } from "react";
import { fetchExploreData } from "../network";
import CourseCard from "../components/CourseCard/CourseCard";

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
        <CourseCard course={course} />
      ))}
    </ul>
  );
};

export default Explore;
