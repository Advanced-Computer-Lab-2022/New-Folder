import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import Button from "react-bootstrap/esm/Button";
import { Checkmark } from "react-checkmark";
import "./SuccessFeedback.css";
function SuccessFeedback(props) {
  const { msg } = props;
  console.log("succed");
  return (
    <div className="text-center" id="successFeedbackContainer">
      <h3 className="blackTxt" id="successHeader">
        {msg}
      </h3>
      <Checkmark size="xxLarge" />
    </div>
  );
}

export default SuccessFeedback;
