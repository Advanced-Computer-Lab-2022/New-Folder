import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetLink } from "../../network";

const AccountRecovery = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await sendPasswordResetLink(email);
    navigate("/");
  };

  return (
    <Form onSubmit={submit}>
      <Container className="mt-4">
        <Col lg="5">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            send password reset email
          </Button>
        </Col>
      </Container>
    </Form>
  );
};

export default AccountRecovery;
