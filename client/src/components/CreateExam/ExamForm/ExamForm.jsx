import React, { useState } from "react";
import "./ExamForm.css";
import Form from "react-bootstrap/Form";

const ExamForm = (props) => {
  const questionIdx = props.questionIdx;
  const questionComponentArr = props.questionComponentArr;
  const setQuestionComponentArr = props.setQuestionComponentArr;

  const [firstChoice, setFirstChoice] = useState("[ None ]");
  const [secondChoice, setSecondChoice] = useState("[ None ]");
  const [thirdChoice, setThirdChoice] = useState("[ None ]");
  const [forthChoice, setForthChoice] = useState("[ None ]");
  const [correctAns, setCorrectAns] = useState(0);

  const updateCorrectAnsData = (ans) => {
    const temp = [...questionComponentArr];
    temp[questionIdx].correctIdx = ans;
    setQuestionComponentArr(temp);
  };

  const updateChoiceArray = (answer, index) => {
    const temp = [...questionComponentArr];
    temp[questionIdx].choices[index] = answer;
    setQuestionComponentArr(temp);
  };

  const updateStatement = (statement) => {
    const temp = [...questionComponentArr];
    temp[questionIdx].statement = statement;
    setQuestionComponentArr(temp);
  };

  return (
    <div className="ExamForm">
      <h4 className="question-number">Question {questionIdx + 1}</h4>
      <Form.Group>
        <Form.Label>Statement</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          placeholder="Statement"
          onChange={(e) => updateStatement(e.target.value)}
        />
        <div>
          <Form.Label>Choices</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            placeholder="First Choice"
            onChange={(e) => {
              updateChoiceArray(e.target.value, 0);
              setFirstChoice(e.target.value);
            }}
          />
          <Form.Control
            size="sm"
            type="text"
            placeholder="Second Choice"
            onChange={(e) => {
              updateChoiceArray(e.target.value, 1);
              setSecondChoice(e.target.value);
            }}
          />
          <Form.Control
            size="sm"
            type="text"
            placeholder="Third Choice"
            onChange={(e) => {
              updateChoiceArray(e.target.value, 2);
              setThirdChoice(e.target.value);
            }}
          />
          <Form.Control
            size="sm"
            type="text"
            placeholder="Forth Choice"
            onChange={(e) => {
              updateChoiceArray(e.target.value, 3);
              setForthChoice(e.target.value);
            }}
          />
          <Form.Label>Correct Answer</Form.Label>
          <div>
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
      </Form.Group>
    </div>
  );
};

export default ExamForm;
