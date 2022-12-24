import { Modal } from "react-bootstrap";
import SuccessFeedback from "../SuccessFeedback/SuccessFeedback";

const SuccessModal = (props) => {
  return (
    <Modal centered show={props.show} onHide={props.handleClose}>
      <SuccessFeedback msg={props.msg} onClose={props.handleClose} />
    </Modal>
  );
};
export default SuccessModal;
