import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UploadVideo = (props) => {
  const subtitleID = props.subtitleID;

  const [videoURL, setVideoURL] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const videoContent = {
      videoURL,
      description,
    };
    try {
      // add content
    } catch (err) {
      console.log(err);
    }
  };

  return (
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

      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default UploadVideo;
