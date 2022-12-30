import "./InstructorNavDropdown.css";
import { NavDropdown } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";

const InstructorNavDropdown = () => {
  return (
    <NavDropdown
      id="navDropdown"
      className="ms-3"
      title={<BsPersonCircle color="#6C757D" size={34} />}
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
    </NavDropdown>
  );
};

export default InstructorNavDropdown;
