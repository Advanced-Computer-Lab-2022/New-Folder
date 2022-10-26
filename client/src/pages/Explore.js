import { useState, useEffect } from "react";
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
        <li> {course.name} </li>
      ))}
    </ul>
  );
};

export default Explore;
