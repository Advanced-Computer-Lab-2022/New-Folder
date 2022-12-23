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
import ReactCountryFlag from "react-country-flag";
import { NavDropdown } from "react-bootstrap";
import AdminSetPromotion from "../AdminSetPromotion/AdminSetPromotion";
import { networkLogout } from "../../network";

const AdminNavbar = (props) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showPromotionModal, setShowPromotionModal] = useState(false);
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
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link onClick={logout}>Logout</Nav.Link>
          <Nav.Link href="/">Explore</Nav.Link>
          <Nav.Link href="/addUser"> Add User</Nav.Link>
          <Nav.Link onClick={() => setShowPromotionModal(true)}>
            Set promotion
          </Nav.Link>
          <Nav.Link href="/reports">Reports</Nav.Link>
          <Nav.Link href="/refunds">Refund requests</Nav.Link>
          <Nav.Link href="/AccessRequests">Courses Requests</Nav.Link>
          <NavDropdown
            className="bg-dark text-light"
            menuVariant="dark"
            title={
              <ReactCountryFlag countryCode={ReactSession.get("country")} svg />
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
      <AdminSetPromotion
        show={showPromotionModal}
        setShow={setShowPromotionModal}
      />
    </Navbar>
  );
};

export default AdminNavbar;
