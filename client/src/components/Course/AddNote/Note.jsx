import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { FetchNote, postNote } from "../../../network";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./Note.css";
import PDFnote from "../../PDF/PDFnote";
import jsPDF from "jspdf";

const Note = (props) => {
  const conID = props.conID;
  const conTitle = props.conTitle;

  const [noteValue, setNoteValue] = useState("");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);

  const generatePDF = (noteTitle, noteContent) => {
    var doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(
      noteTitle,
      doc.internal.pageSize.getWidth() / 2 -
        doc.getStringUnitWidth(noteTitle) -
        25,
      25
    );
    doc.setFontSize(15);
    const s = doc.splitTextToSize(noteContent, 180);
    doc.text(s, 15, 50);
    doc.save(noteTitle + "notes");
  };

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
          setSaved(false);
        }}
      ></textarea>
      <div className="note-buttons">
        <Button
          className="blueBg blueBgHover"
          variant="success"
          onClick={(e) => {
            setSaving(true);
            handleSubmitNote();
            setSaved(true);
            setSaving(false);
          }}
        >
          Save
        </Button>
        <Button
          className="blackBg blackBgHover"
          disabled={!saved}
          variant="success"
          onClick={(e) => {
            generatePDF(conTitle, noteValue);
          }}
        >
          Download as <strong>PDF</strong>
        </Button>

        <div className="saving-spinner">
          <span>
            {saved ? "Saved" : saving ? "Saving ..." : "Not Saved **"}
          </span>
        </div>
      </div>
    </Col>
  );
};

export default Note;
