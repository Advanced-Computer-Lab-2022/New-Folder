import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { countries } from "country-list-json";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactCountryFlag from "react-country-flag";
import userTypes from "../../constants/UserTypes.json";
import NavDropdown from "react-bootstrap/NavDropdown";
import Wallet from "../Wallet/Wallet";
import { networkLogout } from "../../network";
const MainNavbar = (props) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
    }
  };
  const logout = async () => {
    await networkLogout();
    props.setUserType("");
    ReactSession.set("userId", "");
    ReactSession.set("userName", "");
    navigate("/login");
  };
  return (
    <Navbar className="blackBg" sticky="top" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand id="navBrand" href="/">
          Learning System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ height: "3em" }}
            navbarScroll
          >
            <Nav.Link href="/">Explore</Nav.Link>
            {ReactSession.get("userType") === "instructor" ? (
              <Nav.Link href="/myCourses">My Courses</Nav.Link>
            ) : null}
            {ReactSession.get("userType") === "instructor" ? (
              <Nav.Link href="/createCourse">Create Course</Nav.Link>
            ) : null}
            {ReactSession.get("userType") ? (
              <Nav.Link onClick={logout}>Log out</Nav.Link>
            ) : (
              <Nav.Link href="/login">Log in</Nav.Link>
            )}
            {ReactSession.get("userType") ? null : (
              <Nav.Link href="/signup">Sign up</Nav.Link>
            )}
            {ReactSession.get("userType") ? (
              <Nav.Link href="/changePassword">Change password</Nav.Link>
            ) : null}
            {ReactSession.get("userType") === userTypes.instructor ? (
              <Nav.Link href="/myProfile">My profile</Nav.Link>
            ) : null}

            {ReactSession.get("userType") ? (
              <Nav.Link href="/myProblems">Reports</Nav.Link>
            ) : null}

            {ReactSession.get("userType") === userTypes.instructor ? (
              <Nav.Link href="/earnings">Earnings</Nav.Link>
            ) : null}

            {[userTypes.trainee, userTypes.corporateTrainee].includes(
              ReactSession.get("userType")
            ) ? (
              <Nav.Link href="/enrolledCourses">Enrolled Courses</Nav.Link>
            ) : null}

            {ReactSession.get("userType") === userTypes.trainee ? (
              <Wallet />
            ) : null}

            <NavDropdown
              className="text-light"
              menuVariant="dark"
              title={
                <ReactCountryFlag
                  countryCode={ReactSession.get("country")}
                  svg
                />
              }
              onSelect={(e) => props.setCountry(e)}
              scrollable
            >
              {countries.map((country) => (
                <NavDropdown.Item eventKey={country.code}>
                  <ReactCountryFlag countryCode={country.code} svg />
                  {" " + country.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Form className="d-flex" onSubmit={submit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-light">
              Search
            </Button>
            <Button href="/filter" className="ms-2" variant="outline-light">
              Filter
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
