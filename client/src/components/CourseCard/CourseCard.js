import { getPrice } from "../../network";
import { useState, useEffect } from "react";
function CourseCard(props) {
  const [price, setPrice] = useState();
  const fetchPrice = async () => {
    try {
      const fetchedPrice = await getPrice(props.course.price);
      setPrice(fetchedPrice);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPrice();
  });

  return (
    <div>
      <ul>
        <li>{"title: " + props.course.name}</li>
        <li>{"rating: " + props.course.rating}</li>
        <li>{"Duration: "}</li>
        <li>{"Price: " + price}</li>
        <li>{"--------------------------------------"}</li>
      </ul>
    </div>
  );
}

export default CourseCard;
