import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ExcerciseCard from "../../../components/Course/Excercise/ExcerciseCard";
import { fetchExcercise } from "../../../network";
import "./Excercise.css";
const ExcerciseQuestions = [
  {
    statement: "where was the last world cup ?",
    choices: ["Russia", "Dokki", "Mona Zaky", "el dowi2a"],
    correctIdx: 3,
  },
  {
    statement: "where was the last world cup ?",
    choices: ["Russia", "Dokki", "Mona Zaky", "el dowi2a"],
    correctIdx: 3,
  },
  {
    statement: "where was the last world cup ?",
    choices: ["Russia", "Dokki", "Mona Zaky", "el dowi2a"],
    correctIdx: 3,
  },
  {
    statement: "where was the last world cup ?",
    choices: ["Russia", "Dokki", "Mona Zaky", "el dowi2a"],
    correctIdx: 3,
  },
  {
    statement: "where was the last world cup ?",
    choices: ["Russia", "Dokki", "Mona Zaky", "el dowi2a"],
    correctIdx: 3,
  },
];

const Excercise = () => {
  const navigate = useNavigate();
  const { excerciseID } = useParams();
  const [isSubmitted, setIsFinished] = useState(false);
  const [lengthOfQuestions, setLengthOfQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [correctAns, setCorrectAns] = useState(0);

  const fetchingExcercise = async () => {
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
    console.log(arr);
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
    setIsFinished(true);
    setCorrectAns(checkAnswers);
  };

  useEffect(() => {
    fetchingExcercise();
  }, []);

  return (
    <Col>
      <Row lg={1}>
        {isSubmitted && (
          <div className="mark-quiz">
            <h4>
              Mark : {correctAns} / {lengthOfQuestions}
            </h4>
          </div>
        )}
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
        <button
          disabled={isSubmitted}
          type="button"
          class="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {isSubmitted && (
          <button
            type="button"
            class="btn btn-success"
            onClick={() => navigate(-1)}
          >
            Go Back to Course Content
          </button>
        )}
      </div>
    </Col>
  );
};

export default Excercise;
