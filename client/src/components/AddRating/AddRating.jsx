import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ReactSession } from "react-client-session";
function AddRating(props) {
  const { course } = props;
  return (
    <>
      <Form.Group as={Row}>
        <Form.Control type="number" placeholder="min price" />
        <Button variant="dark">Add rating</Button>
      </Form.Group>
    </>
  );
}

export default AddRating;
