import { useState, useEffect } from "react";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { fetchMyCourses } from "../../../network";
import {
  filterCoursesBySubject,
  filterCoursesByPrice,
  filterCoursesByRating,
} from "../../../utils/filters";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

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

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setSubject("");
    setFilteredCourses(courses);
  };

  useEffect(() => {
    fetchData();
    clearFilters();
  }, []);

  return (
    <>
      <Row className="m-4">
        <Form.Group as={Col}>
          <Form.Control
            type="number"
            placeholder="min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            type="number"
            placeholder="max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            type="number"
            placeholder="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            placeholder="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Button variant="dark" className="me-4" onClick={filter}>
            Filter
          </Button>
          <Button variant="dark" onClick={clearFilters}>
            Clear filters
          </Button>
        </Form.Group>
      </Row>
      <ul>
        {filteredCourses.map((course) => (
          <li> {<CourseCard course={course} />} </li>
        ))}
      </ul>
    </>
  );
};

export default MyCourses;
