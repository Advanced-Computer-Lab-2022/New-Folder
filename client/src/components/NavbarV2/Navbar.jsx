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
import { BsCoin } from "react-icons/bs";

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
      <Navbar.Brand id="navBrand">Level Up</Navbar.Brand>
      <Nav id="mainNav" navbarScroll>
        <span id="navLeft">
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
            All Courses
          </Nav.Link>

          {ReactSession.get("userType") === userTypes.admin ? (
            <>
              <Nav.Link className="navItem" href="/addUser">
                Add user
              </Nav.Link>
              <Nav.Link className="navItem" href="/setPromotion">
                Set promotion
              </Nav.Link>
              <Nav.Link className="navItem" onClick={logout}>
                Log out
              </Nav.Link>
            </>
          ) : null}

          {ReactSession.get("userType") ? null : (
            <>
              <Nav.Link className="navItem" href="/login">
                Log in
              </Nav.Link>
              <Nav.Link className="navItem" href="/signup">
                Sign up
              </Nav.Link>
            </>
          )}
        </span>
        <span id="navRight">
          {ReactSession.get("userType") === userTypes.trainee ? (
            <Wallet />
          ) : null}

          {ReactSession.get("userType") === userTypes.instructor ? (
            <Nav.Link href="/earnings">
              <BsCoin color="#6C757D" size={36} />
            </Nav.Link>
          ) : null}

          {[userTypes.trainee, userTypes.corporateTrainee].includes(
            ReactSession.get("userType")
          ) ? (
            <TraineeNavDropdown logout={logout} />
          ) : null}

          {ReactSession.get("userType") === userTypes.instructor ? (
            <InstructorNavDropdown logout={logout} />
          ) : null}

          <CountrySelector setCountry={props.setCountry} />
          <SearchBar />
        </span>
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
