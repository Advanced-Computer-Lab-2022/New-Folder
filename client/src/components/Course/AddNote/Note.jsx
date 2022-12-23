import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { FetchNote, postNote } from "../../../network";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./Note.css";
import PDFnote from "../../PDF/PDFnote";
import jsPDF from 'jspdf';

const Note = (props) => {
  const conID = props.conID;
  const conTitle = props.conTitle;

  const [noteValue, setNoteValue] = useState("");

//   not used but could be used anytime later
  const [download, setDownload] = useState(false);

  const generatePDF = (noteTitle, noteContent) => {
    var doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(noteTitle, 30,25);
    doc.setFontSize(15);
    const s = doc.splitTextToSize(noteContent,200);
    doc.text(s, 15, 50);
    doc.save(noteTitle + "notes");
  }

  const getNote = async () => {
    const traineeNote = await FetchNote(conID);
    setNoteValue(traineeNote.TraineeNote);
  };

  const handleSubmitNote = async () => {
    await postNote(conID, noteValue);
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <Col lg={4} id="sideBar-parent">
      <h2 className="Notes-header">Notes</h2>
      <textarea
        name="the-textarea"
        id="the-textarea"
        placeholder="Take your own notes here ..."
        autofocus
        value={noteValue}
        onChange={(e) => {
          setNoteValue(e.target.value);
        }}
      ></textarea>
      <div className="note-buttons">
        <Button variant="success" onClick={(e) => handleSubmitNote()}>
          Save
        </Button>
        {/* <PDFDownloadLink
          document={<PDFnote conTitle={conTitle} notes={noteValue} />}
          fileName={conTitle + " notes"}
        >
          {({ loading }) =>
            loading ? (
              <Button disabled={true} variant="success" onClick={(e) => setDownload(true)}>
                Download as <strong>PDF</strong>
              </Button>
            ) : (
              <Button variant="success" onClick={(e) => setDownload(true)}>
                Download as <strong>PDF</strong>
              </Button>
            )
          } */}
        {/* </PDFDownloadLink> */}
        <Button variant="success" onClick={(e) => generatePDF(conTitle , noteValue)}>
                Download as <strong>PDF</strong>
        </Button>

      </div>
    </Col>
  );
};

export default Note;
