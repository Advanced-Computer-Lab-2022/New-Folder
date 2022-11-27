import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ExcerciseCard from '../../../components/Course/Excercise/ExcerciseCard'
import './Excercise.css'
const ExcerciseQuestions  = [{
    statement : "where was the last world cup ?",
    choices : ["Russia" , "Dokki" , "Mona Zaky" , "el dowi2a"],
    correctIdx : 3,
},
{
    statement : "where was the last world cup ?",
    choices : ["Russia" , "Dokki" , "Mona Zaky" , "el dowi2a"],
    correctIdx : 3,
},
{
    statement : "where was the last world cup ?",
    choices : ["Russia" , "Dokki" , "Mona Zaky" , "el dowi2a"],
    correctIdx : 3,
},
{
    statement : "where was the last world cup ?",
    choices : ["Russia" , "Dokki" , "Mona Zaky" , "el dowi2a"],
    correctIdx : 3,
},
{
    statement : "where was the last world cup ?",
    choices : ["Russia" , "Dokki" , "Mona Zaky" , "el dowi2a"],
    correctIdx : 3,
}
]


const Excercise = () => {
  return (
    <Col>
        <Row><h4>Mark : 0 / 10</h4></Row>
        <Row lg={1}>
            {ExcerciseQuestions.map((excercise, index)=>{
                return(<ExcerciseCard questionIdx={index +1 }/>);
            })}
          
        </Row>
        <div className="submit-quiz">
            <button type="button" class="btn btn-primary">Submit</button>
        </div>
        
    </Col>
  )
}

export default Excercise