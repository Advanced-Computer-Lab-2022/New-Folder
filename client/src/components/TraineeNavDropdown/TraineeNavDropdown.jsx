import "./TraineeNavDropdown.css";
import { NavDropdown } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
const TraineeNavDropdown = (props) => {
  return (
    <NavDropdown
      id="navDropdown"
      className="ms-3"
      title={<BsPersonCircle color="#949494" size={33} />}
      menuVariant="dark"
    >
      <NavDropdown.Item className="text-center" href="/enrolledCourses">
        Enrolled Courses
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="text-center" href="/myProblems">
        Reported Issues
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="text-center" href="/changePassword">
        Change Password
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className="text-center" onClick={props.logout}>
        Log Out
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default TraineeNavDropdown;
