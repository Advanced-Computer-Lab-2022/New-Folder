import { useEffect, useState } from "react";
import { fetchSearchData } from "../../network";
import CourseCard from "../../components/CourseCard/CourseCard";
import {
  filterCoursesBySubject,
  filterCoursesByPrice,
  filterCoursesByRating,
} from "../../utils/filters";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Spinner, Stack, Row, Form, Button, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Search = () => {
  const { searchQuery } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setSubject("");
    setFilteredSearchResults(searchResults);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedSearchResults = await fetchSearchData({
        query: searchQuery,
      });
      setSearchResults(fetchedSearchResults);
      setFilteredSearchResults(fetchedSearchResults);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    clearFilters();
  }, [searchQuery]);

  useEffect(() => {
    clearFilters();
  }, [searchResults]);

  const filter = async () => {
    let newSearchResults = searchResults;
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
    } else if (minPrice !== "" && maxPrice === "") {
      newSearchResults = await filterCoursesByPrice(
        minPrice,
        Infinity,
        newSearchResults
      );
    } else if (minPrice === "" && maxPrice !== "") {
      newSearchResults = await filterCoursesByPrice(
        0,
        maxPrice,
        newSearchResults
      );
    }
    setFilteredSearchResults(newSearchResults);
  };

  return (
    <div>
      {loading ? (
        <Stack className="m-4">
          <Spinner animation="border" />
        </Stack>
      ) : (
        <div>
          <PageHeader pageName="Search results" />
          <div className="ps-5 pe-5">
            <Row className="m-4 p-2 pt-3 ps-5 pe-5 text-center">
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
              <Col lg="auto">
                <Button className="blueBg blueBgHover" onClick={filter}>
                  Filter
                </Button>
              </Col>
              <Col lg="auto">
                <Button className="greyBg greyBgHover" onClick={clearFilters}>
                  Clear filters
                </Button>
              </Col>
            </Row>
            <div>
              {filteredSearchResults?.length > 0 ? (
                <div className="wrapper">
                  {filteredSearchResults.map((result) => (
                    <div className="mb-4 mt-1">
                      <CourseCard course={result} />
                    </div>
                  ))}
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
        </div>
      )}
    </div>
  );
};

export default Search;
