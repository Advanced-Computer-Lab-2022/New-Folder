import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import { getEnrolledCourses } from "../../network";
import { Image, Spinner, Stack } from "react-bootstrap";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCourses = async () => {
    setLoading(true);
    const data = await getEnrolledCourses();
    setCourses(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div>
      {loading ? (
        <Stack className="m-4">
          <Spinner animation="border" />
        </Stack>
      ) : (
        <div>
          <PageHeader pageName="Enrolled courses" />
          {courses?.length > 0 ? (
            <div className="wrapper mt-5">
              {courses.map((course) => (
                <CourseCard course={course} />
              ))}
            </div>
          ) : (
            <div className="pt-5">
              <Stack className="mt-5" gap={3}>
                <Image width={"23%"} src="/assets/Empty.png" />
                <h4 className="m-auto mt-2">
                  You haven't enrolled in any courses yet.
                </h4>
              </Stack>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
