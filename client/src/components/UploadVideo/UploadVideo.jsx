import "./UploadVideo.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addVideo } from "../../network";
import { useNavigate } from "react-router-dom";

const UploadVideo = (props) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [description, setDescription] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const videoContent = {
        subtitleID: props.subtitleID,
        courseID: props.courseID,
        videoURL,
        videoTitle,
        description,
      };
      try {
        await addVideo(videoContent);
      } catch (err) {
        console.log(err);
      }
      navigate(`/course/${props.courseID}`);
    }

    setValidated(true);
  };

  return (
    <div id="uploadVideoMain">
      <Form noValidate validated={validated} onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Video url</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(e) => setVideoURL(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(e) => setVideoTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="dark" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default UploadVideo;
