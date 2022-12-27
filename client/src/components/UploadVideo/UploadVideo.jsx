import "./UploadVideo.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { addVideo } from "../../network";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../SuccessModal/SuccessModal";
import ErrorModal from "../ErrorModal/ErrorModal";

const UploadVideo = (props) => {
  const [validated, setValidated] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [description, setDescription] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [confMsg, setConfMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

  const clearAll = () => {
    setValidated(false);
    setVideoURL("");
    setDescription("");
    setVideoTitle("");
  };

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setLoading(true);
      const videoContent = {
        subtitleID: props.subtitleID,
        courseID: props.courseID,
        videoURL,
        videoTitle,
        description,
      };
      try {
        await addVideo(videoContent);
        setConfMsg("This video was added successfully.");
        handleShow();
        clearAll();
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        handleShowError();
      }
    }
  };

  return (
    <div className="whiteCard" id="uploadVideoMain">
      <Form noValidate validated={validated} onSubmit={submit}>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Video URL"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <Form.Control.Feedback className="text-start" type="invalid">
            This field is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            value={videoTitle}
            placeholder="Title"
            onChange={(e) => setVideoTitle(e.target.value)}
          />
          <Form.Control.Feedback className="text-start" type="invalid">
            This field is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-5" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Control.Feedback className="text-start" type="invalid">
            This field is required.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="text-end">
          <Button
            disabled={loading}
            className="greyBg me-4"
            onClick={() => clearAll()}
          >
            Cancel
          </Button>
          <Button disabled={loading} className="blueBg" type="submit">
            Add video{" "}
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
      </Form>
      <SuccessModal msg={confMsg} show={show} handleClose={handleClose} />
      <ErrorModal show={showError} handleClose={handleCloseError} />
    </div>
  );
};

export default UploadVideo;
