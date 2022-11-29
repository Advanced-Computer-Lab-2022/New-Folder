import "./UploadVideo.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addVideo } from "../../network";

const UploadVideo = (props) => {
  const [videoURL, setVideoURL] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const videoContent = {
      subtitleID: props.subtitleID,
      courseID: props.courseID,
      videoURL,
      description,
    };
    try {
      await addVideo(videoContent);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="uploadVideoMain">
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Video url</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setVideoURL(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
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
