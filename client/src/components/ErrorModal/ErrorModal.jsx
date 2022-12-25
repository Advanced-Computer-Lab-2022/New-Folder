import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import ErrorFeedback from "../ErrorFeedback/ErrorFeedback";

const ErrorModal = (props) => {
  let timeoutId;
  useEffect(() => {
    if (props.show) {
      timeoutId = setTimeout(close, 3000);
    }
  }, [props.show]);
  const close = () => {
    clearTimeout(timeoutId);
    props.handleClose();
  };
  return (
    <Modal centered show={props.show} onHide={close}>
      <ErrorFeedback />
    </Modal>
  );
};
export default ErrorModal;
