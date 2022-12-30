import { useState, useEffect } from "react";
import CourseCard from "../../../../components/CourseCard/CourseCard";
import { fetchMyCourses } from "../../../../network";
import {
  filterCoursesBySubject,
  filterCoursesByPrice,
  filterCoursesByRating,
} from "../../../../utils/filters";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./MyCourses.css";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../components/PageHeader/PageHeader";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import colors from "../../../../colors.json";
const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
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
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#fff",
      },
    },
  });
  return (
    <>
      <PageHeader
        pageName="My courses"
        extra={
          <Autocomplete
            freeSolo
            sx={{ maxWidth: "400px", marginLeft: "0px" }}
            id="free-solo-2-demo"
            disableClearable
            options={courses}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => {
              navigate("/course/" + value.id);
            }}
            renderInput={(params) => (
              <ThemeProvider theme={theme}>
                <TextField
                  {...params}
                  variant="filled"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  label="Search my courses"
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    borderColor: "white",
                    marginTop: 0.5,
                  }}
                />
              </ThemeProvider>
            )}
          />
        }
      />
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

      <div className="wrapper">
        {filteredCourses.map((course) => (
          <div className="mb-4 mt-1">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyCourses;
