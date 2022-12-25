import React, { useState } from "react";
import { Form, Button, Col, Spinner, InputGroup } from "react-bootstrap";
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
  const [fail, setFail] = useState(false);
  const [gender, setGender] = useState("Male");
  const [userType, setUserType] = useState(UserTypes.admin);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setLoading(true);
    try {
      await postAddUser(userType, { ...data, gender: gender });
      setSuccess(true);
    } catch (err) {
      setFail(true);
    }
    setLoading(false);
  };

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const close = () => {
    setSuccess(false);
    setFail(false);
    navigate("/");
  };
  return (
    <>
      <SuccessModal
        show={success}
        msg={`${userType} added successfully!`}
        handleClose={close}
      />
      <ErrorModal show={fail} handleClose={close} />
      <PageHeader pageName="Add user" />

      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Col md="4" id="addUserWrapper">
          <Form.Group controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                name="username"
                required
                value={data.username}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="validationCustom04">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              This field is required
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
                    label={type}
                    required
                  ></Form.Check>
                )
              );
            })}
          </Form.Group>
          {userType !== UserTypes.admin ? (
            <>
              <Form.Group controlId="validationCustom01">
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
              <Form.Group controlId="validationCustom02">
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

              <Form.Group controlId="validationCustom03">
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
              <Form.Group className="mb-3">
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
          {loading ? (
            <Button type="submit" id="addUserSaveButton" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {" Saving..."}
            </Button>
          ) : (
            <Button type="submit" id="addUserSaveButton">
              Save
            </Button>
          )}
        </Col>
      </Form>
    </>
  );
}

export default AddUser;
