import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { fetchSearchData } from "../../network";
import { countries } from "country-list-json";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ReactCountryFlag from "react-country-flag"

const MainNavbar = (props) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const searchResults = await fetchSearchData({ query: searchQuery });
        props.setSearchResults(searchResults);
        navigate("/search");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Explore</Nav.Link>
          {ReactSession.get("userType") === "instructor" ? (
            <Nav.Link href="/myCourses">My Courses</Nav.Link>
          ) : null}
          {ReactSession.get("userType") === "instructor" ? (
            <Nav.Link href="/createCourse">Create Course</Nav.Link>
          ) : null}
          {ReactSession.get("userType") == null? (
            <Nav.Link href="/addAdmin">Add Admin</Nav.Link>
          ) : null}
          {ReactSession.get("userType") == null? (
            <Nav.Link href="/addInstructor">Add instructor</Nav.Link>
          ) : null}
          {ReactSession.get("userType") == null? (
            <Nav.Link href="/addCorporateTrainee">Add Corporate Trainee</Nav.Link>
          ) : null}
          <Nav.Link href="/login">Login</Nav.Link>
          <ReactCountryFlag countryCode={ReactSession.get("country")} svg />
          <Nav.Link>
            <Form.Select
              className="bg-dark text-light"
              id="country"
              name="country"
              onChange={(e) => props.setCountry(e.target.value)}
            >
              {countries.map((country) => (
                <option
                  selected={country.code === ReactSession.get("country")}
                  value={country.code}
                >
                  <ReactCountryFlag countryCode={country.code} svg />
                  {country.name}
                </option>
              ))}
            </Form.Select>
          </Nav.Link>
          <Form onSubmit={submit}>
            <InputGroup>
              <Form.Control
                placeholder="search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="outline-light">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
