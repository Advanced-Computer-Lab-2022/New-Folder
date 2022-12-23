import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import Button from "react-bootstrap/esm/Button";
import { Checkmark } from "react-checkmark";
import "./SuccessFeedback.css";
function SuccessFeedback(props) {
  const { msg, onClose } = props;
  setTimeout(onClose, 3000);
  return (
    <div id="successFeedbackContainer">
      <h3 className="blackTxt" id="successHeader">
        {msg}
      </h3>
      <Checkmark size="xxLarge" />
    </div>
  );
}

export default SuccessFeedback;
