import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import "./ErrorFeedback.css";
function ErrorFeedback(props) {
  const { onClose } = props;
  setTimeout(onClose, 3000);
  return (
    <div id="successFeedbackContainer">
      <h3 className="blackTxt" id="successHeader">
        Something went wrong, try again later.
      </h3>
      <div id="errorSign">
        <Alert status="error">
          <AlertIcon boxSize="80px" />
        </Alert>
      </div>
    </div>
  );
}

export default ErrorFeedback;
