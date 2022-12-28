import React, { useState } from "react";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import { publishCourse } from "../../../network";
import "../../../App.css";
import "./PublishCourse.css";
import { Button, Spinner } from "react-bootstrap";
import SuccessModal from "../../SuccessModal/SuccessModal";
import ErrorModal from "../../ErrorModal/ErrorModal";
function PublishCourse(props) {
  const { vc, courseId, setVc } = props;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const publish = async () => {
    setLoading(true);
    try {
      await publishCourse(courseId);
      setVc(ViewerContexts.savedAuthor);
      setSuccess(true);
    } catch (err) {
      setFail(true);
    }
    setLoading(false);
  };
  const close = () => {
    setSuccess(false);
    setFail(false);
  };
  return (
    <>
      <SuccessModal
        show={success}
        msg="Course published successfully!"
        handleClose={close}
      />
      <ErrorModal show={fail} handleClose={close} />
      {vc === ViewerContexts.author ? (
        <Button
          onClick={publish}
          id="publishButton"
          className="greyBg greyBgHover"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {" Publishing..."}
            </>
          ) : (
            <>Publish</>
          )}
        </Button>
      ) : null}
    </>
  );
}

export default PublishCourse;
