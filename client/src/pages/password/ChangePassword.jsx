import "./Password.css";
import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { changePassword } from "../../network";
import PageHeader from "../../components/PageHeader/PageHeader";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import ErrorModal from "../../components/ErrorModal/ErrorModal";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confMsg, setConfMsg] = useState("");
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShowConfirmation(false);
  const handleCloseError = () => setShowError(false);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setLoading(true);
    try {
      await changePassword({ oldPassword, newPassword, confirmNewPassword });
      setConfMsg("Your password has been changed successfully.");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setShowError(true);
      console.log(err);
    }
  };

  return (
    <div>
      <PageHeader pageName="Change password" />
      <div className="passwordMain whiteCard">
        <Form noValidate validated={validated} onSubmit={submit}>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Old password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Old password"
              required
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="New password"
              minLength={6}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid password (min: 6 characters).
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label>Confirm New password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New password"
              required
              pattern={newPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              This doesn't match the password you entered.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className=" blueBg blueBgHover passwordBtn"
            type="submit"
            disabled={loading}
          >
            Change password
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
      <ErrorModal show={showError} handleClose={handleCloseError} />
    </div>
  );
};

export default ChangePassword;
