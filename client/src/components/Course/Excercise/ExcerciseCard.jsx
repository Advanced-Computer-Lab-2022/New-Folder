import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./ExcerciseCard.css";

const ExcerciseCard = (props) => {
  const isSubmitted = props.isSubmitted;
  const correctIDx = props.correctIdx;
  const choicesArray = props.questions.choices;
  const statement = props.questions.statement;
  const selectedChoice = props.selectedChoice;

  const questionIdx = props.questionIdx;
  const [answerSelected, setAnswerSelected] = useState(-1);

  const handleChange = (e) => {
    setAnswerSelected(e.target.value);
    selectedChoice(e.target.value);
  };

  return (
    <div
      className={
        "whiteCard " + !isSubmitted
          ? answerSelected !== -1
            ? "question-main"
            : "question-main required"
          : answerSelected == correctIDx
          ? "question-main correct"
          : "question-main wrong"
      }
    >
      <Row className="question-Number">
        <Col>
          <h3>Question {questionIdx + 1}</h3>
        </Col>
        <Col>
          <Row>
            <div
              className={
                "answer-status " + (answerSelected == correctIDx ? "" : "wrong")
              }checked
              hidden={!isSubmitted}
            >
              <span>
                {answerSelected == correctIDx
                  ? "Correct Answer"
                  : "Worng Answer"}
              </span>
              <i
                class={
                  answerSelected == correctIDx
                    ? "bi bi-check-circle-fill"
                    : "bi bi-x-circle-fill"
                }
              ></i>
            </div>
          </Row>
        </Col>
      </Row>

      <div className="question-header">
        <p>{statement}</p>
      </div>
      <form>
        <Form.Group>
          {choicesArray.map((choice, index) => {
            return (
              <Form.Check
                disabled={isSubmitted}
                checked={answerSelected == index}
                value={index}
                type="radio"
                label={choice}
                onChange={handleChange}
              />
            );
          })}
        </Form.Group>
      </form>

      <div className="correct-answer">
        {isSubmitted && answerSelected != correctIDx && (
          <p>
            Correct Answer : <span> {choicesArray[correctIDx]}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ExcerciseCard;
