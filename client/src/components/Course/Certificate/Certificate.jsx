import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import certificateTemp from "./certificate-template/certificate.png";
import { ReactSession } from "react-client-session";
import "./Certificate.css";
import { sendCertificate } from "../../../network";
import ReactLoading from "react-loading";
import Loading from "react-loading";
import { useEffect } from "react";

const Certificate = (props) => {
  const [show, setShow] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [mailLoading, setMailLoading] = useState(false);
  const courseName = props.courseName;
  const percentage = props.percentage;

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowMail = () => setShowMail(true);
  const handleCloseMail = () => setShowMail(false);

  const handlesendCertificate = async () => {
    await sendCertificate(ReactSession.get("userName"), courseName);
    handleClose();
    handleShowMail();
    setMailLoading(false);
  };

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
    doc.save(ReactSession.get("userName") + " certificate");
  };

  return (
    <div>
      <div
        className="tooltip-wrapper"
        data-toggle="tooltip"
        data-placement="top"
        title={
          Math.trunc(percentage) !== 100
            ? "To earn certificate, complete the whole course"
            : "download PDF or via Email"
        }
      >
        <Button
          disabled={Math.trunc(percentage) !== 100}
          onClick={handleShow}
          className="greenBgHover ms-3"
          style={{ height: "41px" }}
        >
          Earn Certificate
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header id="modal-Certificate" closeButton>
          <Modal.Title id="modal-Certificate">Earn Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body className="certificate-msg" id="modal-Certificate">
          You can have your certificate by dowloading it as <strong>PDF</strong>{" "}
          or send it on your <strong>Email</strong>
        </Modal.Body>
        <Modal.Footer id="modal-Certificate">
          <Button
            className="blueBg blueBgHover"
            variant="warning"
            onClick={() => {
              setMailLoading(true);
              handlesendCertificate();
            }}
          >
            <div className="Email-loader">
              {mailLoading && (
                <ReactLoading
                  className="Email-Loader-spinner"
                  type={"spin"}
                  height={18}
                  width={18}
                />
              )}
              <span>
                {" "}
                Send by <strong>Email</strong>
              </span>
            </div>
          </Button>
          <Button
            className="blackBg blackBgHover"
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

      <Modal show={showMail} onHide={handleCloseMail} centered>
        <Modal.Header id="modal-Certificate" closeButton>
          <Modal.Title id="modal-Certificate">Certificate Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-Certificate">
          Your Certificate has been sent on your <strong>Email</strong>{" "}
          successfully.
        </Modal.Body>
        <Modal.Footer id="modal-Certificate">
          <Button
          className="blueBg blueBgHover"
            variant="warning"
            onClick={() => {
              handleCloseMail();
            }}
          >
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Certificate;
