import { NavDropdown } from "react-bootstrap";

const InstructorNavDropdown = () => {
  return (
    <NavDropdown title="Instructor Dropdown" menuVariant="dark">
      <NavDropdown.Item href="/myCourses">My Courses</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/createCourse">Create Course</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/myProfile">My profile</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/myProblems">Reports</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/changePassword">
        Change password
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default InstructorNavDropdown;
