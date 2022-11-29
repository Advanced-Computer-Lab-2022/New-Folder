import React, { useEffect } from 'react'
import { useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import './CreateExam.css'
import ExamForm from './ExamForm/ExamForm'


const CreateExam = (props) => {
  const [questionComponentArr , setQuestionComponentArr] = useState([{statement: "none", choices:['none','none','none','none'], correctIdx:0}]);
  const [questionRecord , setQuestionRecord] = useState([null]);

  // const handleDataChange = (data,questionIndex) => {
  //   let arr = [...questionComponentArr];
  //   arr [questionIndex] = data;
  //   setQuestionComponentArr(arr);
  //   console.log(arr);
  // }

  const addAnotherQuestion = () => {
    setQuestionRecord((oldstate)=> {
      const temp = [...oldstate , null];
      return temp;
    });

    let arr = questionComponentArr;
    arr.push({statement: "none", choices:['none','none','none','none'], correctIdx:0});
    setQuestionComponentArr(arr);
    
  }

  // for testing questionComponentArr
  useEffect (()=>{
    console.log(questionComponentArr);
  },[questionComponentArr])

  return (
    <div className='create-exam'>
      <Row className="create-exam-header">
        <Col><h4>Create New Quiz</h4></Col>
        <Col><button type="button" class="btn btn-primary">Add Quiz</button></Col>
      </Row>
      <Row>
        <Row className='form-area' lg={1}>
          {questionRecord.map((questionComponent, index)=>{
            return (<ExamForm key={index} questionIdx={index} questionComponentArr={questionComponentArr} setQuestionComponentArr={setQuestionComponentArr}/>);
          })}
        </Row>
      </Row>

      <Row className='btn-addmore'>
        <Col><button type="button" class="btn btn-primary rounded-pill" onClick={addAnotherQuestion}><i class="bi bi-plus"></i>Add Another Question</button></Col>
      </Row>


    </div>
  )
}

export default CreateExam
