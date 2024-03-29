import { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import { fetchExploreData } from "../../network";
import {
  filterCoursesBySubject,
  filterCoursesByPrice,
  filterCoursesByRating,
} from "../../utils/filters";
import PageHeader from "../../components/PageHeader/PageHeader";
import {
  Spinner,
  Stack,
  Row,
  Form,
  Button,
  Col,
  Image,
  Container,
} from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Autocomplete, TextField } from "@mui/material";
import "./Explore/Explore.css";
import { ReactSession } from "react-client-session";
import userTypes from "../../constants/UserTypes.json";
import { useNavigate } from "react-router-dom";
const Filter = () => {
  const navigate = useNavigate();
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
    } else if (minPrice !== "" && maxPrice === "") {
      newCourses = await filterCoursesByPrice(minPrice, Infinity, newCourses);
    } else if (minPrice === "" && maxPrice !== "") {
      newCourses = await filterCoursesByPrice(0, maxPrice, newCourses);
    }
    setFilteredCourses(newCourses);
  };

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
    <div>
      {loading ? (
        <Stack className="m-4">
          <Spinner animation="border" />
        </Stack>
      ) : (
        <div>
          <PageHeader
            pageName="All courses"
            extra={
              <Autocomplete
                sx={{ maxWidth: "400px", marginLeft: "0px" }}
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={filteredCourses}
                getOptionLabel={(option) => option?.name ?? ""}
                onChange={(event, value) => {
                  if (filteredCourses.includes(value)) {
                    setFilteredCourses([value]);
                  } else {
                    setFilteredCourses([]);
                  }
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
                      label="Search filtered courses"
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
            {ReactSession.get("userType") ===
            userTypes.corporateTrainee ? null : (
              <>
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
              </>
            )}
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
            {filteredCourses?.length > 0 ? (
              <div className="wrapper">
                {filteredCourses.map((course) => (
                  <div className="mb-4 mt-1">
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="pt-5">
                <Stack className="mt-5" gap={3}>
                  <Image width={"23%"} src="/assets/Empty.png" />
                  <h4 className="m-auto mt-2">No courses found</h4>
                </Stack>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
