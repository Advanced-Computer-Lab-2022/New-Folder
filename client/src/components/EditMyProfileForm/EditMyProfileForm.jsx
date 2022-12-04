import "./EditMyProfileForm.css";
import { useState, useEffect } from "react";
import { editMyProfile } from "../../network";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ImPencil } from "react-icons/im";

const EditMyProfileForm = (props) => {
  const [allowEdit, setAllowEdit] = useState(false);
  const [email, setEmail] = useState(props.email);
  const [about, setAbout] = useState(props.about);

  useEffect(() => {
    setEmail(props.email);
    setAbout(props.about);
  }, [props.email, props.about]);

  const submit = async (e) => {
    e.preventDefault();
    await editMyProfile({ email, about });
    setAllowEdit(false);
    props.setAbout(about);
    props.setEmail(email);
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
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FloatingLabel>
              ) : (
                <Card onClick={() => setAllowEdit(true)}>
                  <Card.Body className="myInfoStaticCard">{email}</Card.Body>
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
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  />
                </FloatingLabel>
              ) : (
                <Card onClick={() => setAllowEdit(true)}>
                  <Card.Body className="myInfoStaticCard">{about}</Card.Body>
                </Card>
              )}
            </Form.Group>
            {allowEdit ? (
              <div class="text-end">
                <Button
                  className="saveMyProfileChangesBtn"
                  variant="outline-dark"
                  onClick={cancelChanges}
                >
                  cancel changes
                </Button>
                <Button
                  className="saveMyProfileChangesBtn"
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
