import "./EditMyProfileForm.css";
import { useState, useEffect } from "react";
import { editMyProfile } from "../../network";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ImPencil } from "react-icons/im";
import Spinner from "react-bootstrap/Spinner";
import { Card } from "react-bootstrap";

const EditMyProfileForm = (props) => {
  const [allowEdit, setAllowEdit] = useState(false);
  const [email, setEmail] = useState(props.email);
  const [about, setAbout] = useState(props.about);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(props.email);
    setAbout(props.about);
  }, [props.email, props.about]);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setLoading(true);
    await editMyProfile({ email, about });
    setAllowEdit(false);
    props.setAbout(about);
    props.setEmail(email);
    setLoading(false);
  };

  const cancelChanges = () => {
    setAllowEdit(false);
    setEmail(props.email);
    setAbout(props.about);
  };

  return (
    <div>
      <h3 id="editMyInformation">
        My Information{" "}
        <ImPencil
          onClick={() => setAllowEdit(true)}
          id="pencilIcon"
          size={20}
        />
      </h3>
      <div id="editMyProfileMain" className="whiteCard">
        <Form
          noValidate
          validated={validated}
          onSubmit={submit}
          id="editProfileItem"
        >
          <Col className="mb-3">
            <Form.Group className="editInfoFormItem mb-4">
              <Form.Label>Email</Form.Label>
              {allowEdit ? (
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Edit your email"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    value={email ?? ""}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email (example@gmail.com).
                  </Form.Control.Feedback>
                </FloatingLabel>
              ) : (
                <Card onClick={() => setAllowEdit(true)}>
                  <Card.Body className="myInfoStaticCard">
                    {email ?? "You haven't added your email yet"}
                  </Card.Body>
                </Card>
              )}
            </Form.Group>
            <Form.Group className="editInfoFormItem mb-4">
              <Form.Label>Bio</Form.Label>
              {allowEdit ? (
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Edit your bio"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    value={about ?? ""}
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  />
                </FloatingLabel>
              ) : (
                <Card onClick={() => setAllowEdit(true)}>
                  <Card.Body className="myInfoStaticCard">
                    {!about || about?.length === 0
                      ? "You haven't added your bio yet"
                      : about}
                  </Card.Body>
                </Card>
              )}
            </Form.Group>
            {allowEdit ? (
              <div class="text-end">
                <Button
                  className="saveMyProfileChangesBtn greyBg greyBgHover"
                  onClick={cancelChanges}
                  disabled={loading}
                >
                  Cancel changes
                </Button>
                <Button
                  className="saveMyProfileChangesBtn blueBg blueBgHover"
                  type="submit"
                  disabled={loading}
                >
                  Save changes{" "}
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
              </div>
            ) : null}
          </Col>
        </Form>
      </div>
    </div>
  );
};

export default EditMyProfileForm;
