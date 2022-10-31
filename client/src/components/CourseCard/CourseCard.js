import { getPrice, fetchcCourseDetils } from "../../network";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";

function CourseCard(props) {
  const [price, setPrice] = useState();
  const navigate = useNavigate();
  const fetchPrice = async () => {
    try {
      const fetchedPrice = await getPrice(props.course.price);
      console.log(fetchedPrice);
      setPrice(fetchedPrice);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourseReq = async (id) => {
    try {
      const fetchedCourses = await fetchcCourseDetils(id);
      navigate("/courses", { state: { course: fetchedCourses } });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, [ReactSession.get("country"), props.course]);

  return (
    <div>
      <ul>
        <li>{"title: " + props.course.name}</li>
        <li>{"rating: " + props.course.rating}</li>
        <li>{"Duration: " + props.course.duration}</li>
        {ReactSession.get("userType") !== "corporateTrainee" ? (
          <li>{"Price: " + price}</li>
        ) : null}
        <button type="button" onClick={(e) => fetchCourseReq(props.course._id)}>
          Go to Course
        </button>
        <li>{"--------------------------------------"}</li>
      </ul>
    </div>
  );
}

export default CourseCard;
