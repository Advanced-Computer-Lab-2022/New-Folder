import "./EditMyProfileForm.css";
import { useState } from "react";
import { editMyProfile } from "../../network";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const EditMyProfileForm = (props) => {
  const [hasNewChanges, setHasNewChanges] = useState(false);
  const submit = async () => {
    await editMyProfile({ email: props.email, about: props.about });
    setHasNewChanges(false);
  };

  return (
    <div>
      <h3 id="editMyInformation">My Information</h3>
      <Card id="editMyProfileMain">
        <Form onSubmit={submit} id="editProfileItem">
          <Col className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
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
                    setHasNewChanges(true);
                  }}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
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
                    setHasNewChanges(true);
                  }}
                />
              </FloatingLabel>
            </Form.Group>
            {hasNewChanges ? (
              <div class="text-end">
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
