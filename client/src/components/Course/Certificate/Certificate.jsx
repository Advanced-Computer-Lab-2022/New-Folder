import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import certificateTemp from "./certificate-template/certificate.png";
import { ReactSession } from "react-client-session";
import './Certificate.css'

const Certificate = (props) => {
  const [show, setShow] = useState(false);
  const courseName = props.courseName;

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const generatePDF = () => {
    var doc = new jsPDF({ orientation: "l", format: "a4", compress: true });
    let width = doc.internal.pageSize.getWidth();
    let height = doc.internal.pageSize.getHeight();
    doc.addImage(certificateTemp, "PNG", 0, 0, width, height);
    doc.setFontSize(25);
    doc.text(ReactSession.get("userName"), width / 2, height / 2, {
      align: "center",
    });
    doc.setFontSize(25);
    doc.text(courseName, width / 2, height / 2 + 25, { align: "center" });
    doc.save("certificate");
  };

  return (
    <div>
      <Button onClick={handleShow} variant="success">
        Earn Certificate
      </Button>

      <Modal  show={show} onHide={handleClose} centered>
        <Modal.Header id="modal-Certificate" closeButton>
          <Modal.Title id="modal-Certificate">Earn Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-Certificate">
          You can have your certificate by dowloading it as <strong>PDF</strong>{" "}
          or send it on your <strong>Email</strong>
        </Modal.Body>
        <Modal.Footer id="modal-Certificate">
          <Button variant="warning">
            Send by <strong>Email</strong>
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              generatePDF();
              handleClose();
            }}
          >
            Download <strong>PDF</strong>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Certificate;
