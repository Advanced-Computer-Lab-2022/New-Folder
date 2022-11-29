import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { countries } from "country-list-json";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ReactCountryFlag from "react-country-flag";
import userTypes from "../../constants/UserTypes.json";

const MainNavbar = (props) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Explore</Nav.Link>
          {ReactSession.get("userType") === "instructor" ? (
            <Nav.Link href="/myCourses">My Courses</Nav.Link>
          ) : null}
          {ReactSession.get("userType") === "instructor" ? (
            <Nav.Link href="/createCourse">Create Course</Nav.Link>
          ) : null}

          <Nav.Link href="/login">Login</Nav.Link>
          {ReactSession.get("userType") ? (
            <Nav.Link href="/changePassword">Change password</Nav.Link>
          ) : null}
          {ReactSession.get("userType") === userTypes.instructor ? (
            <Nav.Link href="/myProfile">myProfile</Nav.Link>
          ) : null}
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
