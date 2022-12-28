import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";

function AddSubtitle(props) {
  const { newSubtitle, setNewSubtitle, submit, validated } = props;
  const [editing, setEditing] = useState(false);
  const cancel = () => {
    setEditing(false);
    setNewSubtitle("");
  };
  return (
    <>
      {editing ? (
        <Form noValidate validated={validated} onSubmit={submit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label as={"h6"}>Add subtitle</Form.Label>
            <Form.Control
              as="textarea"
              required
              onChange={(e) => setNewSubtitle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Subtitle can not be empty
            </Form.Control.Feedback>
          </Form.Group>
          <div id="followupFormFooter">
            <Button
              variant="secondary"
              onClick={cancel}
              className="followupFormButton"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="followupFormButton"
            >
              Add
            </Button>
          </div>
        </Form>
      ) : (
        <h5 id="addIconWrapper">
          <AiOutlinePlusCircle onClick={() => setEditing(true)} /> &nbsp;Add a
          subtitle
        </h5>
      )}
    </>
  );
}

export default AddSubtitle;
