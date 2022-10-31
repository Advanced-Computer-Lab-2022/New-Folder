import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard/CourseCard";
import { fetchMyCourses } from "../network";
import {
  filterCoursesBySubject,
  filterCoursesByPrice,
  filterCoursesByRating,
} from "../utils/filters";
const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [subject, setSubject] = useState("");
  const fetchData = async () => {
    try {
      const fetchedCourses = await fetchMyCourses();
      setCourses(fetchedCourses);
      setFilteredCourses(fetchedCourses);
    } catch (err) {
      console.log(err);
    }
  };
  const filter = async () => {
    let newCourses = courses;
    if (subject !== "") {
      newCourses = filterCoursesBySubject(subject, newCourses);
    }
    if (rating !== "") {
      newCourses = filterCoursesByRating(rating, newCourses);
    }
    if (minPrice !== "" && maxPrice !== "") {
      newCourses = await filterCoursesByPrice(minPrice, maxPrice, newCourses);
    }
    setFilteredCourses(newCourses);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ul>
        {filteredCourses.map((course) => (
          <li> {<CourseCard course={course} />} </li>
        ))}
      </ul>
      <input
        type="number"
        value={minPrice}
        placeholder="min price"
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        value={maxPrice}
        placeholder="max price"
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <input
        type="number"
        value={rating}
        placeholder="rating"
        onChange={(e) => setRating(e.target.value)}
      />
      <input
        type="text"
        value={subject}
        placeholder="subject"
        onChange={(e) => setSubject(e.target.value)}
      />
      <button onClick={filter}>Filter</button>
    </>
  );
};

export default MyCourses;
