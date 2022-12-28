import { NavDropdown } from "react-bootstrap";

const TraineeNavDropdown = () => {
  return (
    <NavDropdown title="Trainee Dropdown" menuVariant="dark">
      <NavDropdown.Item href="/enrolledCourses">
        Enrolled Courses
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/myProblems">Reports</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/changePassword">
        Change password
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default TraineeNavDropdown;
