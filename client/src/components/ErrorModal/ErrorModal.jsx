import { Modal } from "react-bootstrap";
import ErrorFeedback from "../ErrorFeedback/ErrorFeedback";

const ErrorModal = (props) => {
  return (
    <Modal centered show={props.show} onHide={props.handleClose}>
      <ErrorFeedback onClose={props.handleClose} />
    </Modal>
  );
};
export default ErrorModal;
