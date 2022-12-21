import React, { useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postAddUser } from "../../network";
import UserTypes from "../../constants/UserTypes.json";

function AddUser() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const { username, password } = data;
  const onSubmit = (e) => {
    postAddUser(userType, data);
    navigate("/");
  };

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
