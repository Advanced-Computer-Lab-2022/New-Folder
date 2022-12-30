import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import "./EditPreviewVideo.css";
function EditPreviewVideo(props) {
  const { newVideo, setNewVideo, uploadIntroVideo } = props;
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const close = () => {
    setEditing(false);
    setNewVideo(null);
    setValidated(false);
    setSuccess(false);
    setFail(false);
  };
  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(false);
    setLoading(true);
    try {
      await uploadIntroVideo(newVideo);
      setSuccess(true);
    } catch (err) {
      setFail(true);
    }
    setLoading(false);
  };

  return (
    <>
      <ErrorModal show={fail} handleClose={close} />
      <SuccessModal
        msg="Video uploaded successfully!"
        show={success}
        handleClose={close}
      />
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

          <Button
            id="cancelPreviewVideo"
            onClick={close}
            disabled={loading}
            className="redBgHover"
          >
            Cancel
          </Button>
          <Button
            id="savePreviewVideo"
            type="submit"
            disabled={loading}
            className="blackBgHover"
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {" Saving..."}
              </>
            ) : (
              <>{"Add video"}</>
            )}
          </Button>
        </Form>
      ) : (
        <Button
          id="editPreviewVideoButton"
          variant="outline-light"
          onClick={() => setEditing(true)}
        >
          Edit Preview Video
        </Button>
      )}
    </>
  );
}

export default EditPreviewVideo;
