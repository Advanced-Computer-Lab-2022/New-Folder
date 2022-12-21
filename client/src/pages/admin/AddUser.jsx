import React, { useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postAddUser } from "../../network";
import UserTypes from "../../constants/UserTypes.json";

function AddUser() {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [gender, setGender] = useState("male");
  const [userType, setUserType] = useState(UserTypes.admin);
  const navigate = useNavigate();
  const { username, password, email, firstName, lastName } = data;
  const onSubmit = (e) => {
    console.log({ ...data, gender: gender });
    postAddUser(userType, { ...data, gender: gender });
    navigate("/");
  };

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target);
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Container className="mt-4">
          <Col lg="5">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="username"
                name="username"
                value={username}
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
                value={password}
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
                    value={firstName}
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
                    value={lastName}
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
                    value={email}
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
              <Button type="submit" variant="dark">
                {" "}
                add{" "}
              </Button>
            </Form.Group>
          </Col>
        </Container>
      </Form>
    </>
  );
}

export default AddUser;
