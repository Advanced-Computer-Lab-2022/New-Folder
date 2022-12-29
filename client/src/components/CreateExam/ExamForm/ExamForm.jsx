import React, { useEffect, useState } from "react";
import "./ExamForm.css";
import Form from "react-bootstrap/Form";

const ExamForm = (props) => {
  const questionIdx = props.questionIdx;
  const questionComponentArr = props.questionComponentArr;
  const setQuestionComponentArr = props.setQuestionComponentArr;
  const clear = props.clear;
  const setClear = props.setClear;
  const [statement, steStatement] = useState("");
  const [firstChoice, setFirstChoice] = useState("[ None ]");
  const [secondChoice, setSecondChoice] = useState("[ None ]");
  const [thirdChoice, setThirdChoice] = useState("[ None ]");
  const [forthChoice, setForthChoice] = useState("[ None ]");
  const [firstField, setFirstField] = useState("");
  const [secondField, setSecondField] = useState("");
  const [thirdField, setThirdField] = useState("");
  const [forthField, setForthField] = useState("");
  const [correctAns, setCorrectAns] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (clear) {
      steStatement("");
      setFirstChoice("[ None ]");
      setSecondChoice("[ None ]");
      setThirdChoice("[ None ]");
      setForthChoice("[ None ]");
      setFirstField("");
      setSecondField("");
      setThirdField("");
      setForthField("");
      setClear(false);
    }
  }, [clear]);

  const updateCorrectAnsData = (ans) => {
    const temp = [...questionComponentArr];
    temp[questionIdx].correctIdx = ans;
    setQuestionComponentArr(temp);
  };

  const updateChoiceArray = (answer, index) => {
    const temp = [...questionComponentArr];
    temp[questionIdx].choices[index] = answer;
    setQuestionComponentArr(temp);
    updateIsCompleted();
  };

  const updateStatement = (statement) => {
    const temp = [...questionComponentArr];
    temp[questionIdx].statement = statement;
    setQuestionComponentArr(temp);
    updateIsCompleted();
  };

  const updateIsCompleted = () => {
    const temp = [...questionComponentArr];
    const statementQuestion = temp[questionIdx].statement;
    let ischoicesNone = false;
    for (let i = 0; i < temp[questionIdx].choices.length; i++) {
      if (
        temp[questionIdx].choices[i] === "none" ||
        temp[questionIdx].choices[i] === ""
      ) {
        ischoicesNone = true;
        break;
      }
    }
    if (statementQuestion == "none" || statementQuestion == "" || ischoicesNone)
      setIsCompleted(false);
    else setIsCompleted(true);
  };

  return (
    <div className={"whiteCard ExamForm"}>
      <div className="questionStatement-header">
        <h4 className="question-number">Question {questionIdx + 1}</h4>
      </div>

      <Form.Group>
        <Form.Label>Statement</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Statement"
          onChange={(e) => {
            steStatement(e.target.value);
            updateStatement(e.target.value);
          }}
          value={statement}
        />
        <Form.Control.Feedback
          id="text-feedback"
          className="text-start"
          type="invalid"
        >
          This field is required.
        </Form.Control.Feedback>
      </Form.Group>

      <div>
        <Form.Label>Choices</Form.Label>
        <Form.Group>
          <Form.Control
            type="text"
            required
            placeholder="First Choice"
            onChange={(e) => {
              setFirstField(e.target.value);
              setFirstChoice(e.target.value);
              updateChoiceArray(e.target.value, 0);
            }}
            value={firstField}
          />
          <Form.Control.Feedback
            id="text-feedback"
            className="text-start"
            type="invalid"
          >
            This field is required.
          </Form.Control.Feedback>
          <Form.Control
            type="text"
            required
            placeholder="Second Choice"
            onChange={(e) => {
              setSecondField(e.target.value);
              setSecondChoice(e.target.value);
              updateChoiceArray(e.target.value, 1);
            }}
            value={secondField}
          />
          <Form.Control.Feedback
            id="text-feedback"
            className="text-start"
            type="invalid"
          >
            This field is required.
          </Form.Control.Feedback>
          <Form.Control
            type="text"
            required
            placeholder="Third Choice"
            onChange={(e) => {
              setThirdField(e.target.value);
              setThirdChoice(e.target.value);
              updateChoiceArray(e.target.value, 2);
            }}
            value={thirdField}
          />
          <Form.Control.Feedback
            id="text-feedback"
            className="text-start"
            type="invalid"
          >
            This field is required.
          </Form.Control.Feedback>
          <Form.Control
            type="text"
            required
            placeholder="Forth Choice"
            onChange={(e) => {
              setForthField(e.target.value);
              setForthChoice(e.target.value);
              updateChoiceArray(e.target.value, 3);
            }}
            value={forthField}
          />
          <Form.Control.Feedback
            id="text-feedback"
            className="text-start"
            type="invalid"
          >
            This field is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Label>Correct Answer</Form.Label>
        <div className="chooseCorrectAnswer">
          <Form.Check
            checked={correctAns == 0}
            type="radio"
            label={firstChoice}
            onClick={() => {
              updateCorrectAnsData(0);
              setCorrectAns(0);
            }}
          />
          <Form.Check
            checked={correctAns == 1}
            type="radio"
            label={secondChoice}
            onClick={() => {
              updateCorrectAnsData(1);
              setCorrectAns(1);
            }}
          />
          <Form.Check
            checked={correctAns == 2}
            type="radio"
            label={thirdChoice}
            onClick={() => {
              updateCorrectAnsData(2);
              setCorrectAns(2);
            }}
          />
          <Form.Check
            checked={correctAns == 3}
            type="radio"
            label={forthChoice}
            onClick={() => {
              updateCorrectAnsData(3);
              setCorrectAns(3);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamForm;
