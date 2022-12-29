import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createNewSubtitle } from "../../../network";

function AddSubtitle(props) {
  const { course, setCourse, setSubtitles } = props;
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [newSubtitle, setNewSubtitle] = useState("");
  const cancel = () => {
    setEditing(false);
    setNewSubtitle("");
  };
  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    try {
      const updatedCourse = await createNewSubtitle(course._id, newSubtitle);
      setCourse(updatedCourse);
      setSubtitles(updatedCourse.subtitles);
    } catch (err) {
      console.log(err);
    }
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
