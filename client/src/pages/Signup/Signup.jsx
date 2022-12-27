import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactSession } from "react-client-session";
import { signup } from "../../network";
import { Alert, Spinner } from "react-bootstrap";
import SignupTerms from "../../components/SignupTerms/SignupTerms";

const Signup = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [showError, setShowError] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
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
    <div id="signupMain3">
      <div id="signupMain" className="whiteCard">
        <h1 className="text-center mb-5">Learning System</h1>
        <Alert show={showError} variant="danger">
          {errorMsg}
        </Alert>
        <Form noValidate validated={validated} onSubmit={submit}>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-2"
            controlId="formBasicCheckbox"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <Form.Label>Gender</Form.Label>
            <Form.Check
              type="radio"
              label="Male"
              name="group1"
              value="male"
              required
              onChange={(e) => setGender("male")}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="group1"
              required
              value="female"
              onSelect={(e) => setGender("female")}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email (example@gmail.com).
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid password (min: 6 characters).
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              pattern={password}
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              This doesn't match the password you entered.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Check
              type="checkbox"
              label={
                <p>
                  Agree to{" "}
                  <a
                    onClick={() => setShowTerms(true)}
                    className="signupLinks blueTxt"
                  >
                    terms and conditions
                  </a>
                  .
                </p>
              }
              required
            />
          </Form.Group>
          <Button
            className="mb-3 blueBg blueBgHover"
            id="signupBtn"
            disabled={loading}
            type="submit"
          >
            Sign up{" "}
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
        </Form>
      </div>
      <div id="signupMain2" className="whiteCard">
        <h4>
          Already have an account?{" "}
          <a className="signupLinks blueTxt" href="/login">
            Log in
          </a>
        </h4>
      </div>
      <SignupTerms show={showTerms} setShow={setShowTerms} />
    </div>
  );
};

export default Signup;
