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
import { Alert, Spinner } from "react-bootstrap";
const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setLoading(true);
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
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.response.data.error);
      setShowError(true);
      console.log(err);
    }
  };

  return (
    <div id="loginMain3">
      <div id="loginMain" className="whiteCard">
        <h1 className="mb-5">Learning System</h1>
        <Alert show={showError} variant="danger">
          {errorMsg}
        </Alert>
        <Form noValidate validated={validated} onSubmit={submit}>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              required
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control.Feedback className="text-start" type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback className="text-start" type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className="mb-4 blueBg blueBgHover"
            id="loginBtn"
            disabled={loading}
            type="submit"
          >
            Log in{" "}
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                className="ms-1"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
          </Button>
          <h5>
            <a className="loginLinks blueTxt" href="/forgetPassword">
              Forgot password?
            </a>
          </h5>
        </Form>
      </div>
      <div id="loginMain2" className="whiteCard">
        <h3>
          Don't have an account?{" "}
          <a className="loginLinks blueTxt" href="/signup">
            Sign up
          </a>
        </h3>
      </div>
    </div>
  );
};

export default Login;
