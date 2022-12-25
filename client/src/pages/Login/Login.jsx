import "./Login.css";
import { useState } from "react";
import { login } from "../../network";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import { ReactSession } from "react-client-session";
import userTypes from "../../constants/UserTypes.json";
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
    <div id="loginMain3">
      <div id="loginMain">
        <h1 className="mb-5">Learning System</h1>
        <Form onSubmit={submit}>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="mb-4" id="loginBtn" variant="dark" type="submit">
            Log in
          </Button>
          <h5>
            <a className="loginLinks" href="/forgetPassword">
              Forgot password?
            </a>
          </h5>
        </Form>
      </div>
      <div id="loginMain2">
        <h3>
          Don't have an account?{" "}
          <a className="loginLinks" href="/signup">
            Sign up
          </a>
        </h3>
      </div>
    </div>
  );
};

export default Login;
