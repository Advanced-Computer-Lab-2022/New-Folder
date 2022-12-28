import React from "react";
import { Form } from "react-bootstrap";
import "./ChoiceCard.css";

const ChoiceCard = (props) => {
  const { isSubmitted, checked, index, choice, handleChange , setAnswerSelected , selectedChoice } = props;

  return (
    <div 
      className={checked ? "choice-card selected" : "choice-card NotSelected blueBgHover"} onClick={()=> {if (!isSubmitted)setAnswerSelected(index) ;selectedChoice(index)} }
    >
      <Form.Check
        className="choice-radio"
        disabled={isSubmitted}
        checked={checked}
        value={index}
        type="radio"
        label={""}
        onClick={handleChange}
      />
      <p>{choice}</p>
    </div>
  );
};

export default ChoiceCard;
