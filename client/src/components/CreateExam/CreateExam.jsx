import React, { useEffect } from "react";
import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { addExam } from "../../network";
import "./CreateExam.css";
import ExamForm from "./ExamForm/ExamForm";

const CreateExam = (props) => {
  const subtitleID = props.subtitleID;
  const [questionComponentArr, setQuestionComponentArr] = useState([
    {
      statement: "none",
      choices: ["none", "none", "none", "none"],
      correctIdx: 0,
    },
  ]);
  let questionRequired = [];
  const [questionRecord, setQuestionRecord] = useState([null]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
  // if an examForm is not completed ? then : it will be included in array to know which corresponding examForm is not yet done
  const handleNotCompletedQuestions = () => {
    for (let i = 0; i < questionComponentArr.length; i++) {
      let isChoiceNone = false;
      for (
        let choice = 0;
        choice < questionComponentArr[i].choices.length;
        choice++
      ) {
        if (questionComponentArr[i].choices[choice] === "none") {
          isChoiceNone = true;
          break;
        }
      }
      if (questionComponentArr[i].statement == "none" || isChoiceNone) {
        questionRequired.push(i);
      }
    }
  };

  // handleSubmit is used for passing examContent as it is into the database
  const handleSubmit = async () => {
    questionRequired = [];

    handleNotCompletedQuestions();


    if (questionRequired.length === 0) {
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

  useEffect(()=>{
    console.log(questionComponentArr);
  },[questionComponentArr]);

  return (
    <div className="create-exam">
      <Row className="create-exam-header">
        <Col>
          <h4>Create New Quiz</h4>
        </Col>
        <Col>
          <button type="button" class="btn btn-primary" onClick={handleSubmit}>
            Add Quiz
          </button>
        </Col>
      </Row>
      <Row>
        <Row className="form-area" lg={1}>
          {questionRecord.map((questionComponent, index) => {
            return (
              <ExamForm
                // isCompleted={}
                key={index}
                questionIdx={index}
                questionComponentArr={questionComponentArr}
                setQuestionComponentArr={setQuestionComponentArr}
              />
            );
          })}
        </Row>
      </Row>

      <Row className="btn-addmore">
        <Col>
          <button
            type="button"
            class="btn btn-primary rounded-pill"
            onClick={addAnotherQuestion}
          >
            <i class="bi bi-plus"></i>Add Another Question
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default CreateExam;
