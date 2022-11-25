import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../network";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await changePassword({ oldPassword, newPassword, confirmNewPassword });
    navigate("/");
  };

  return (
    <Form onSubmit={submit}>
      <Container className="mt-4">
        <Col lg="5">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Old password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Confirm New password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Change password
          </Button>
        </Col>
      </Container>
    </Form>
  );
};

export default ChangePassword;
