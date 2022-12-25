import React, { useState } from "react";
import { Form, Button, Col, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postAddUser } from "../../network";
import UserTypes from "../../constants/UserTypes.json";
import PageHeader from "../../components/PageHeader/PageHeader";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import ErrorModal from "../../components/ErrorModal/ErrorModal";

function AddUser() {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [gender, setGender] = useState("male");
  const [userType, setUserType] = useState(UserTypes.admin);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
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
      <Form>
        <Container className="mt-4">
          <Col lg="5">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="username"
                name="username"
                value={data.username}
                placeholder="Enter your username"
                onChange={onChange}
                required
              />
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
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                id="password"
                name="password"
                value={data.password}
                placeholder="Enter password"
                onChange={onChange}
                required
              />
            </Form.Group>
            {userType !== UserTypes.admin && (
              <>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={data.firstName}
                    placeholder="firstName"
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={data.lastName}
                    placeholder="lastName"
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    id="email"
                    name="email"
                    value={data.email}
                    placeholder="email"
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3">
              {loading ? (
                <Button variant="dark" disabled>
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
                <Button onClick={onSubmit} variant="dark">
                  Save
                </Button>
              )}
            </Form.Group>
          </Col>
        </Container>
      </Form>
    </>
  );
}

export default AddUser;
