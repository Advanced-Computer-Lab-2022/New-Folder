import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import './ExcerciseCard.css'

const ExcerciseCard = (props) => {
    const questionIdx  = props.questionIdx;
    const [answerSelected, setAnswerSelected ] = useState(-1);

    const handleChange = (e)=>{ 
        setAnswerSelected(e.target.value)
    }


    return (
        <div className='question-main'>
            <h3 className='question-Number'>Question {questionIdx}</h3>
            <div className='question-header'><p>where was the last world cup ?</p></div>
            <form>
                <Form.Group>
                    <Form.Check checked={answerSelected == 0} value="0" type="radio" label="Russia" onChange={handleChange}/>
                    <Form.Check checked={answerSelected == 1} value="1" type="radio" label="Masr" onChange={handleChange}/>
                    <Form.Check checked={answerSelected == 2} value="2" type="radio" label="Italy" onChange={handleChange} />
                    <Form.Check checked={answerSelected == 3} value="3" type="radio" label="Mona zaky" onChange={handleChange}/>
                </Form.Group>
        
            </form>
        
        </div>
    )
}

export default ExcerciseCard