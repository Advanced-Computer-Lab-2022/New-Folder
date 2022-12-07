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
  const [isCompleted, setIsCompleted] = useState(false);

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
      if (temp[questionIdx].choices[i] === "none" || temp[questionIdx].choices[i] === "")  {
        ischoicesNone = true;
        break;
      }
    }
    if (statementQuestion == "none" || statementQuestion == "" || ischoicesNone)
      setIsCompleted(false);
    else setIsCompleted(true);
  };


  return (
    <div className={isCompleted ? "ExamForm" :  "ExamForm NotCompleted"}>
      <div className="questionStatement-header">
        <h4 className="question-number">Question {questionIdx + 1}</h4>
        {!isCompleted && <div className="alert-IsRequired">
          <p >* please fill in all the fields</p>
        </div> }
      </div>
      
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
              setFirstChoice(e.target.value);
              updateChoiceArray(e.target.value, 0);
            }}
          />
          <Form.Control
            size="sm"
            type="text"
            placeholder="Second Choice"
            onChange={(e) => {
              setSecondChoice(e.target.value);
              updateChoiceArray(e.target.value, 1);
            }}
          />
          <Form.Control
            size="sm"
            type="text"
            placeholder="Third Choice"
            onChange={(e) => {
              setThirdChoice(e.target.value);
              updateChoiceArray(e.target.value, 2);
              
            }}
          />
          <Form.Control
            size="sm"
            type="text"
            placeholder="Forth Choice"
            onChange={(e) => {
              setForthChoice(e.target.value);
              updateChoiceArray(e.target.value, 3);
            }}
          />
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
      </Form.Group>
    </div>
  );
};

export default ExamForm;
