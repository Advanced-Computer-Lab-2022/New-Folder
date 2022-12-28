import "./Navbar.css";
import { Nav, Navbar } from "react-bootstrap";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import CountrySelector from "../CountrySelector/CountrySelector";
import SearchBar from "../SearchBar/SearchBar";
import Wallet from "../Wallet/Wallet";
import { networkLogout } from "../../network";
import userTypes from "../../constants/UserTypes.json";
import TraineeNavDropdown from "../TraineeNavDropdown/TraineeNavDropdown";
import InstructorNavDropdown from "../InstructorNavDropdown/InstructorNavDropdown";

const AppNavbar = (props) => {
  const navigate = useNavigate();

  const logout = async () => {
    await networkLogout();
    props.setUserType("");
    ReactSession.set("userId", "");
    ReactSession.set("userName", "");
    navigate("/login");
  };

  return (
    <Navbar className="blackBg" sticky="top" variant="dark">
      <Navbar.Brand id="navBrand" href="/">
        Learning System
      </Navbar.Brand>
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ height: "5em" }}
        navbarScroll
      >
        {ReactSession.get("userType") === userTypes.admin ? (
          <Nav.Link className="navItem" href="/adminHome">
            Home
          </Nav.Link>
        ) : (
          <Nav.Link className="navItem" href="/">
            Explore
          </Nav.Link>
        )}

        <Nav.Link className="navItem" href="/allCourses">
          Courses
        </Nav.Link>
        {ReactSession.get("userType") ? (
          <Nav.Link className="navItem" onClick={logout}>
            Log out
          </Nav.Link>
        ) : (
          <Nav.Link className="navItem" href="/login">
            Log in
          </Nav.Link>
        )}
        {ReactSession.get("userType") ? null : (
          <Nav.Link className="navItem" href="/signup">
            Sign up
          </Nav.Link>
        )}

        {ReactSession.get("userType") === userTypes.trainee ? <Wallet /> : null}

        {ReactSession.get("userType") === userTypes.instructor ? (
          <Nav.Link className="navItem" href="/earnings">
            Earnings
          </Nav.Link>
        ) : null}

        {[userTypes.trainee, userTypes.corporateTrainee].includes(
          ReactSession.get("userType")
        ) ? (
          <TraineeNavDropdown />
        ) : null}

        {ReactSession.get("userType") === userTypes.instructor ? (
          <InstructorNavDropdown />
        ) : null}

        {ReactSession.get("userType") === userTypes.admin ? (
          <>
            <Nav.Link className="navItem" href="/addUser">
              Add user
            </Nav.Link>
            <Nav.Link className="navItem" href="/setPromotion">
              Set promotion
            </Nav.Link>
          </>
        ) : null}

        <SearchBar />
        <CountrySelector setCountry={props.setCountry} />
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
