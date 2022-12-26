import { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import { fetchExploreData } from "../../network";
import {
  filterCoursesBySubject,
  filterCoursesByPrice,
  filterCoursesByRating,
} from "../../utils/filters";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Spinner, Stack, Row, Form, Button, Col, Image } from "react-bootstrap";
import "./Explore/Explore.css";
const Explore = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedCourses = await fetchExploreData();
      setFilteredCourses(fetchedCourses);
      setCourses(fetchedCourses);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    clearFilters();
  }, []);

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setSubject("");
    setFilteredCourses(courses);
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

  return (
    <div>
      {loading ? (
        <Stack className="m-4">
          <Spinner animation="border" />
        </Stack>
      ) : (
        <div>
          <PageHeader pageName="Filter courses" />
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
              <Button className="me-3 blueBg blueBgHover" onClick={filter}>
                Filter
              </Button>
              <Button className="greyBg greyBgHover" onClick={clearFilters}>
                Clear filters
              </Button>
            </Form.Group>
          </Row>
          <div>
            {filteredCourses?.length > 0 ? (
              <div className="explore__content">
                <div className="wrapper">
                  {filteredCourses.map((course) => (
                    <CourseCard course={course} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-5">
                <Stack className="mt-5" gap={3}>
                  <Image width={"23%"} src="/assets/Empty.png" />
                  <h4 className="m-auto mt-2">No results found</h4>
                </Stack>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
