import React, { useState } from "react";
import { Form, Button, Col, Spinner, InputGroup, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postAddUser } from "../../../network";
import UserTypes from "../../../constants/UserTypes.json";
import PageHeader from "../../../components/PageHeader/PageHeader";
import SuccessModal from "../../../components/SuccessModal/SuccessModal";
import ErrorModal from "../../../components/ErrorModal/ErrorModal";
import "./AddUser.css";
function AddUser() {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [gender, setGender] = useState("Male");
  const [userType, setUserType] = useState(UserTypes.admin);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [corporateName, setCorporateName] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setShowError(false);
    setErrorMsg(null);
    setLoading(true);
    try {
      if (userType === UserTypes.instructor) {
        const finalData = { ...data, gender: gender };
        await postAddUser(userType, finalData);
      } else {
        const finalData = {
          ...data,
          gender: gender,
          corporateName: corporateName,
        };
        await postAddUser(userType, finalData);
      }
      setSuccess(true);
    } catch (err) {
      setErrorMsg(err.response.data.message);
      setShowError(true);
    }
    setLoading(false);
  };
  // This function returns the user type in a human readable way instead of camel case
  const getUserType = (s) => {
    if (s === UserTypes.admin) {
      return "Admin";
    }
    if (s === UserTypes.corporateTrainee) {
      return "Corporate trainee";
    }
    if (s === UserTypes.instructor) {
      return "Instructor";
    }
    return "";
  };
  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const close = () => {
    setSuccess(false);
    setShowError(false);
    navigate("/");
  };
  return (
    <div className="pb-3">
      <SuccessModal
        show={success}
        msg={`${getUserType(userType)} added successfully!`}
        handleClose={close}
      />
      <PageHeader pageName="Add user" />

      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Col md="4" id="addUserWrapper">
          <Alert show={showError} variant="danger">
            {errorMsg}
          </Alert>
          <Form.Group className="mb-2" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                name="username"
                required
                minLength={2}
                value={data.username}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid username (min: 2 characters).
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-2" controlId="validationCustom04">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              name="password"
              placeholder="Password"
              minLength={6}
              value={data.password}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid password (min: 6 characters).
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              pattern={data.password}
            />
            <Form.Control.Feedback type="invalid">
              This doesn't match the password you entered.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            {Object.values(UserTypes).map((type) => {
              return (
                type !== UserTypes.trainee && (
                  <Form.Check
                    type="radio"
                    name="type"
                    checked={userType == type}
                    onChange={(e) => {
                      setUserType(type);
                    }}
                    label={getUserType(type)}
                    required
                  ></Form.Check>
                )
              );
            })}
          </Form.Group>
          {userType !== UserTypes.admin ? (
            <>
              <Form.Group className="mb-2" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={data.firstName}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  This field is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={data.lastName}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  This field is required
                </Form.Control.Feedback>
              </Form.Group>
              {userType === UserTypes.corporateTrainee ? (
                <Form.Group className="mb-2" controlId="validationCustom04">
                  <Form.Label>Corporate Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Corporate Name"
                    name="Corporate Name"
                    value={corporateName}
                    onChange={(e) => {
                      setCorporateName(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                </Form.Group>
              ) : (
                <></>
              )}
              <Form.Group className="mb-2" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  required
                  name="email"
                  value={data.email}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  This field is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Gender</Form.Label>
                {Object.values(["Male", "Female"]).map((type) => {
                  return (
                    <Form.Check
                      type="radio"
                      name="gender"
                      checked={gender == type}
                      onChange={(e) => {
                        setGender(type);
                      }}
                      label={type}
                      required
                    />
                  );
                })}
              </Form.Group>
            </>
          ) : null}
          <Button
            type="submit"
            className="blueBgHover"
            id="addUserSaveButton"
            disabled={loading}
          >
            Add user{" "}
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
        </Col>
      </Form>
    </div>
  );
}

export default AddUser;
