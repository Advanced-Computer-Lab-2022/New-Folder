import { getPrice } from "../../network";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";

function CourseCard(props) {
  const [price, setPrice] = useState();
  const fetchPrice = async () => {
    try {
      const fetchedPrice = await getPrice(props.course.price);
      console.log(fetchedPrice);
      setPrice(fetchedPrice);
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
        <li>{"Price: " + price}</li>
        <li>{"--------------------------------------"}</li>
      </ul>
    </div>
  );
}

export default CourseCard;
