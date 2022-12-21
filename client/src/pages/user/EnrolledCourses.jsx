import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import { getEnrolledCourses } from "../../network";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    const data = await getEnrolledCourses();
    setCourses(data);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className="wrapper">
      {courses.map((course) => (
        <CourseCard course={course} />
      ))}
    </div>
  );
};

export default EnrolledCourses;
