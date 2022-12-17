import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { FetchNote, postNote } from "../../../network";
import "./Note.css";
const Note = (props) => {
    const conID  = props.conID;
  
    
    const [noteValue , setNoteValue] = useState("");

    const getNote = async ()=> {
        const traineeNote = await FetchNote(conID);
        setNoteValue(traineeNote.TraineeNote)
    }

    const handleSubmitNote = async () => {
        await postNote(conID , noteValue);
    }

    useEffect (()=> {
        getNote();
    },[]);

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
        <Button variant="success" onClick={(e)=> handleSubmitNote()}>
          Save
        </Button>
        <Button variant="success">
          Download as <strong>PDF</strong>
        </Button>
      </div>
    </Col>
  );
};

export default Note;
