import { useState } from "react";
import { login } from "../network";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import { ReactSession } from "react-client-session";
import userTypes from "../constants/UserTypes.json";
import { signup } from "../network";
const Signup = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
      email,
      firstName,
      lastName,
      gender,
    };
    try {
      const userData = await signup(loginData);
      ReactSession.set("userType", userData.data.userType);
      props.setUserType(userData.data.userType);
      ReactSession.set("userId", userData.data.userId);
      if (userData.data.userType !== userTypes.corporateTrainee) {
        ReactSession.set(
          "userName",
          userData.data.firstName + " " + userData.data.lastName
        );
      } else {
        ReactSession.set("userName", userData.data.userName);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={submit}>
      <Container className="mt-4">
        <Col lg="5">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
            onChange={(e) => {
              console.log(e);
              setGender(e.target.value);
            }}
          >
            <Form.Label>Gender</Form.Label>
            <Form.Check
              type="radio"
              label="Male"
              name="group1"
              value="male"
              onChange={(e) => setGender("male")}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="group1"
              value="female"
              onSelect={(e) => setGender("female")}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            submit
          </Button>
          <a href="/login">Login</a>
        </Col>
      </Container>
    </Form>
  );
};

export default Signup;
