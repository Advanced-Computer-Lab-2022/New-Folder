import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./EditPreviewVideo.css";
function EditPreviewVideo(props) {
  const { newVideo, setNewVideo, uploadIntroVideo } = props;
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const close = () => {
    setEditing(false);
    setNewVideo(null);
    setValidated(false);
  };
  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    await uploadIntroVideo(newVideo);
    close();
  };

  return (
    <>
      {editing ? (
        <Form noValidate validated={validated} onSubmit={submit}>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder="Video url"
              value={newVideo}
              required
              onChange={(e) => {
                setNewVideo(e.target.value);
              }}
              id="urlInput"
            />
            <Form.Control.Feedback type="invalid">
              Video url cannot be empty
            </Form.Control.Feedback>
          </Form.Group>

          <Button id="cancelPreviewVideo" onClick={close}>
            Cancel
          </Button>
          <Button id="savePreviewVideo" type="submit">
            Add video
          </Button>
        </Form>
      ) : (
        <Button id="editPreviewVideoButton" onClick={() => setEditing(true)}>
          Edit Preview Video
        </Button>
      )}
    </>
  );
}

export default EditPreviewVideo;
