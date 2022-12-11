import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
function ReportCourse(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} size={"lg"} centered>
        <Modal.Header>
          <Modal.Title>Report course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Problem type</Form.Label>
            <Form.Select>
              <option>Financial</option>
              <option>Technical</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State the problem</Form.Label>
            <Form.Control placeholder="Disabled input" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={() => setShow(true)}>Report</Button>
    </>
  );
}

export default ReportCourse;
