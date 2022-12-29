import React, { useEffect } from "react";
import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addExam } from "../../network";
import "./CreateExam.css";
import ExamForm from "./ExamForm/ExamForm";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

const CreateExam = (props) => {
  const subtitleID = props.subtitleID;
  const [questionComponentArr, setQuestionComponentArr] = useState([
    {
      statement: "none",
      choices: ["none", "none", "none", "none"],
      correctIdx: 0,
    },
  ]);

  const [questionRecord, setQuestionRecord] = useState([null]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [headerMsg, setHeaderMsg] = useState("");
  const [configMsg, setConfigMsg] = useState("");
  const [show, setShow] = useState(false);
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const goBack = () => navigate(-1);

  // add more question forms
  const addAnotherQuestion = () => {
    setQuestionRecord((oldstate) => {
      const temp = [...oldstate, null];
      return temp;
    });

    let arr = questionComponentArr;
    arr.push({
      statement: "none",
      choices: ["none", "none", "none", "none"],
      correctIdx: 0,
    });
    setQuestionComponentArr(arr);
  };

  // check that everything in the exam content is modified and done
  // if an examForm is not completed return true otherwise false
  const handleNotCompletedQuestions = () => {
    for (let i = 0; i < questionComponentArr.length; i++) {
      let isChoiceNone = false;
      for (
        let choice = 0;
        choice < questionComponentArr[i].choices.length;
        choice++
      ) {
        console.log(questionComponentArr[i].choices[choice]);
        if (
          questionComponentArr[i].choices[choice] === "none" ||
          questionComponentArr[i].choices[choice] === ""
        ) {
          isChoiceNone = true;
          break;
        }
      }
      console.log("statement : " + questionComponentArr[i].statement);
      if (
        questionComponentArr[i].statement === "none" ||
        questionComponentArr[i].statement === "" ||
        isChoiceNone
      ) {
        return true;
      }
    }
    return false;
  };

  // handleSubmit is used for passing examContent as it is into the database
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidate(true);
      setIsSubmitted(false);
      setHeaderMsg("Fields are not completed");
      setConfigMsg(
        "Please fill all required fields including question statement and choices"
      );
      handleShow();
    } else {
      const examContent = {
        subtitleID: subtitleID,
        questionComponentArr,
      };
      try {
        await addExam(examContent);
      } catch (err) {
        console.log(err);
      }
      setIsSubmitted(true);
      setHeaderMsg("Excercise Created");
      setConfigMsg("Excercise has been created and submitted successfully");
      handleShow();
      setQuestionComponentArr([
        {
          statement: "none",
          choices: ["none", "none", "none", "none"],
          correctIdx: 0,
        },
      ]);
      setQuestionRecord([null]);
    }
  };

  useEffect(() => {
    console.log(questionComponentArr);
  }, [questionComponentArr]);

  return (
    <div className="create-exam">
      <Form
        noValidate
        validated={validate}
        onSubmit={handleSubmit}
        className="form-area"
        lg={1}
      >
        <Row className="form-field-map">
          {questionRecord.map((questionComponent, index) => {
            return (
              <ExamForm
                key={index}
                questionIdx={index}
                questionComponentArr={questionComponentArr}
                setQuestionComponentArr={setQuestionComponentArr}
              />
            );
          })}
        </Row>

        <div className="btn-addmore">
          <button
            type="button"
            className="btn btn-primary rounded-pill blueBgHover"
            onClick={addAnotherQuestion}
          >
            Add Another Question
          </button>
          <Button
            type="submit"
            className="btn btn-primary rounded-pill blackBgHover"
            
          >
            Add Quiz
          </Button>
        </div>
      </Form>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton id="Modal-header">
          <Modal.Title id="Modal-header">{headerMsg}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-3">{configMsg}</Modal.Body>
        <Modal.Footer id="Modal-header">
          <Button
            variant={isSubmitted ? "success" : "dark"}
            onClick={isSubmitted ? goBack : handleClose}
          >
            {isSubmitted ? "Return to Course Content" : "close"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateExam;
