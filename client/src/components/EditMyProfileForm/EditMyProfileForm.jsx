import "./EditMyProfileForm.css";
import { useState } from "react";
import { editMyProfile } from "../../network";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ImPencil } from "react-icons/im";

const EditMyProfileForm = (props) => {
  const [allowEdit, setAllowEdit] = useState(false);
  const [originalEmail, setOriginalEmail] = useState(props.email);
  const [originalAbout, setOriginalAbout] = useState(props.about);

  const submit = async (e) => {
    e.preventDefault();
    await editMyProfile({ email: props.email, about: props.about });
    setAllowEdit(false);
    setOriginalAbout(props.about);
    setOriginalEmail(props.email);
  };

  const cancelChanges = () => {
    setAllowEdit(false);
    props.setAbout(originalAbout);
    props.setEmail(originalEmail);
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
      <Card id="editMyProfileMain">
        <Form onSubmit={submit} id="editProfileItem">
          <Col className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              {allowEdit ? (
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Edit your email"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    value={props.email}
                    onChange={(e) => {
                      props.setEmail(e.target.value);
                    }}
                  />
                </FloatingLabel>
              ) : (
                <Card>
                  <Card.Body className="myInfoStaticCard">
                    {props.email}
                  </Card.Body>
                </Card>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              {allowEdit ? (
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Edit your bio"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    value={props.about}
                    onChange={(e) => {
                      props.setAbout(e.target.value);
                    }}
                  />
                </FloatingLabel>
              ) : (
                <Card>
                  <Card.Body className="myInfoStaticCard">
                    {props.about}
                  </Card.Body>
                </Card>
              )}
            </Form.Group>
            {allowEdit ? (
              <div class="text-end">
                <Button
                  id="saveMyProfileChangesBtn"
                  variant="outline-dark"
                  onClick={cancelChanges}
                >
                  cancel changes
                </Button>
                <Button
                  id="saveMyProfileChangesBtn"
                  variant="dark"
                  type="submit"
                >
                  save changes
                </Button>
              </div>
            ) : null}
          </Col>
        </Form>
      </Card>
    </div>
  );
};

export default EditMyProfileForm;
