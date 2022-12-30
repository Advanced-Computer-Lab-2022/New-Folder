import "./InstructorNavDropdown.css";
import { NavDropdown } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";

const InstructorNavDropdown = (props) => {
  return (
    <NavDropdown
      id="navDropdown"
      className="ms-3"
      title={<BsPersonCircle color="#949494" size={33} />}
      menuVariant="dark"
    >
      <NavDropdown.Item className="text-center" href="/myCourses">
        My Courses
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="text-center" href="/createCourse">
        Create Course
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="text-center" href="/myProfile">
        My profile
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="text-center" href="/myProblems">
        Reports
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="text-center" href="/changePassword">
        Change password
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="text-center" onClick={props.logout}>
        Log out
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default InstructorNavDropdown;
