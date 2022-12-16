import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import "./RequestAccess.css";
function RequestAccess(props) {
  const [pending, setPending] = useState(false);
  useEffect(() => {
    setPending(props.vc === ViewerContexts.pendingCorporateTrainee);
  }, [props.vc]);
  return (
    <>
      {pending ? (
        <Button className="accessButton" variant="danger">
          Cancel access request
        </Button>
      ) : (
        <Button className="accessButton" variant="dark">
          Request access
        </Button>
      )}
    </>
  );
}

export default RequestAccess;
