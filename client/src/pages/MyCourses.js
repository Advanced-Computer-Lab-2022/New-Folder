import { useState, useEffect } from "react";
import { fetchMyCourses } from "../network";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    try {
      const fetchedCourses = await fetchMyCourses();
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

export default MyCourses;
