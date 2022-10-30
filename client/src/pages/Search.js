import { useState } from "react";
import CourseCard from "../components/CourseCard/CourseCard";
import {
  filterCoursesBySubject,
  filterCoursesByPrice,
  filterCoursesByRating,
} from "../utils/filters";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Search = (props) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [subject, setSubject] = useState("");

  const filter = async () => {
    let newSearchResults = props.searchResults;
    if (subject !== "") {
      newSearchResults = filterCoursesBySubject(subject, newSearchResults);
    }
    if (rating !== "") {
      newSearchResults = filterCoursesByRating(rating, newSearchResults);
    }
    if (minPrice !== "" && maxPrice !== "") {
      newSearchResults = await filterCoursesByPrice(
        minPrice,
        maxPrice,
        newSearchResults
      );
    }
    props.setSearchResults(newSearchResults);
  };

  return (
    <>
      <ul>
        {props.searchResults.map((result) => (
          <CourseCard course={result} />
        ))}
      </ul>
      <Row className="m-4">
        <Form.Group as={Col}>
          <Form.Control
            type="number"
            placeholder="min price"
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            type="number"
            placeholder="max price"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            type="number"
            placeholder="rating"
            onChange={(e) => setRating(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            placeholder="subject"
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Button variant="dark" type="submit" onClick={filter}>
            Filter
          </Button>
        </Form.Group>
      </Row>
    </>
  );
};

export default Search;
