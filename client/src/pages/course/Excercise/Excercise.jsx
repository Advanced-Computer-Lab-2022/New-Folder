import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ExcerciseCard from "../../../components/Course/Excercise/ExcerciseCard";
import { fetchExcercise, postMark } from "../../../network";
import PageHeader from "../../../components/PageHeader/PageHeader";
import "./Excercise.css";
import userTypes from "../../../constants/UserTypes.json";
import { ReactSession } from "react-client-session";
const Excercise = () => {
  const navigate = useNavigate();
  const { excerciseID } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lengthOfQuestions, setLengthOfQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [correctAns, setCorrectAns] = useState(0);

  const [show, setShow] = useState(false);
  const [configMsg, setConfigMsg] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isTrainee, setTrainee] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowConfirmation = () => setShowConfirmation(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);

  const handleConfirm = async () => {
    handleCloseConfirmation();
    const exer = await postMark(excerciseID, correctAns);
    setIsSubmitted(true);
    handleShow();
  };

  const fetchingExcercise = async () => {
    if (
      [userTypes.trainee, userTypes.corporateTrainee].includes(
        ReactSession.get("userType")
      )
    ) {
      setTrainee(true);
    } else {
      setTrainee(false);
    }
    try {
      const fetchedExcercise = await fetchExcercise(excerciseID);
      setQuestions(fetchedExcercise.Questions);
      if (fetchedExcercise.Questions != null) {
        setLengthOfQuestions(fetchedExcercise.Questions.length);
        let arr = [];
        for (let i = 0; i < fetchedExcercise.Questions.length; i++)
          arr.push(null);

        setAnswers(arr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const computeAnswer = (answerIndex, questionIndex) => {
    let arr = answers;
    arr[questionIndex] = answerIndex;
    setAnswers(arr);
  };

  let isCompleted = () => {
    let arr = [...answers];
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === null) return false;
    }
    return true;
  };

  const checkAnswers = () => {
    let correct = 0;
    for (
      let indexOfQuestion = 0;
      indexOfQuestion < questions.length;
      indexOfQuestion++
    ) {
      if (
        parseInt(answers[indexOfQuestion]) ===
        questions[indexOfQuestion].correctIdx
      )
        correct++;
    }
    return correct;
  };

  const handleSubmit = () => {
    if (isCompleted()) {
      setCorrectAns(checkAnswers);
      setConfigMsg(
        "Great work ! you've done it if you didn't do well this time, That's not the end of life "
      );
      handleShowConfirmation();
    } else {
      setIsSubmitted(false);
      setConfigMsg("please Answer all required questions");
      handleShow();
    }
  };

  useEffect(() => {
    fetchingExcercise();
  }, []);

  return (
    <Col>
      <PageHeader
        pageName="Exercise"
        extra={
          <Col md="auto" className="mark-quiz" id="pageNameCol">
            {isSubmitted && (
              <h3>
                Mark : {correctAns} / {lengthOfQuestions}
              </h3>
            )}
          </Col>
        }
      />
      <Row className="pt-5" lg={1}>
        {questions.map((question, index) => {
          return (
            <ExcerciseCard
              questions={question}
              isSubmitted={isSubmitted}
              questionIdx={index}
              correctIdx={question.correctIdx}
              selectedChoice={(ans) => {
                computeAnswer(ans, index);
              }}
            />
          );
        })}
      </Row>
      <div className="submit-quiz">
        {isTrainee ? (
          <button
            disabled={isSubmitted}
            type="button"
            className="blueBg blueBgHover btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : null}

        {isSubmitted && (
          <button
            type="button"
            className="blackBg blackBgHover btn btn-success"
            onClick={() => navigate(-1)}
          >
            Go Back to Course Content
          </button>
        )}
      </div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header id="quiz-reaction">
          <Modal.Title id="quiz-reaction">
            {isSubmitted ? "Quiz Submission" : "Quiz Not Completed"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body id="quiz-reaction-body">
          {isSubmitted && <p>Your quiz has been submitted successfully</p>}
          {isSubmitted && <p>Your Result is </p>}

          {isSubmitted ? (
            <span id="quiz-reaction-result-main">
              <span id="quiz-reaction-result">{correctAns} /</span>{" "}
              {lengthOfQuestions}
            </span>
          ) : (
            <i id="notSubmitted" class="bi bi-x-circle"></i>
          )}
          <p>{configMsg}</p>
        </Modal.Body>

        <Modal.Footer id="quiz-reaction">
          <Button
            className="blueBg blueBgHover "
            variant="primary"
            onClick={handleClose}
          >
            continue
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={showConfirmation} onHide={handleClose}>
        <Modal.Header id="quiz-reaction">
          <Modal.Title id="quiz-reaction">Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body id="quiz-reaction-confirmation">
          <p>Do you want to end this exercise ?</p>
        </Modal.Body>

        <Modal.Footer id="quiz-reaction">
          <Button
            className="greyBg greyBgHover"
            variant="Danger"
            onClick={handleCloseConfirmation}
          >
            Cancel
          </Button>
          <Button
            className="blueBg blueBgHover "
            variant="primary"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default Excercise;
