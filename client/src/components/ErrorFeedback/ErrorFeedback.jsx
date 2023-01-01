import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import "./ErrorFeedback.css";
function ErrorFeedback(props) {
  return (
    <div className="text-center" id="successFeedbackContainer">
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
