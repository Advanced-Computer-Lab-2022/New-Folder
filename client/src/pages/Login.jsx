import { useState } from "react";
import { login } from "../network";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import { ReactSession } from "react-client-session";

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };
    try {
      const userData = await login(loginData);
      ReactSession.set("userType", userData.data.userType);
      props.setUserType(userData.data.userType);
      ReactSession.set("userId", userData.data.userId);
      ReactSession.set(
        "userName",
        userData.data.firstName + " " + userData.data.lastName
      );
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
          <Button variant="dark" type="submit">
            submit
          </Button>
          <a href="/forgetPassword">forget password</a>
        </Col>
      </Container>
    </Form>
  );
};

export default Login;
