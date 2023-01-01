import "./Password.css";
import { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { sendPasswordResetLink } from "../../network";
import PageHeader from "../../components/PageHeader/PageHeader";
import SuccessModal from "../../components/SuccessModal/SuccessModal";

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confMsg, setConfMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShowConfirmation(false);

  const submit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setShowError(false);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetLink({ username });
      setConfMsg("You will recieve an email with your password reset link.");
      setShowConfirmation(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.response.data.error);
      setShowError(true);
      console.log(err);
    }
  };

  return (
    <div>
      <PageHeader pageName="Forget password" />
      <div className="passwordMain whiteCard">
        <Alert show={showError} variant="danger">
          {errorMsg}
        </Alert>
        <Form noValidate validated={validated} onSubmit={submit}>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className="blueBg blueBgHover passwordBtn"
            type="submit"
            disabled={loading}
          >
            Send password reset email{" "}
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
      <SuccessModal
        msg={confMsg}
        show={showConfirmation}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ForgetPassword;
