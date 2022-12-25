import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import SuccessFeedback from "../SuccessFeedback/SuccessFeedback";

const SuccessModal = (props) => {
  let timeoutId;
  useEffect(() => {
    if (props.show) {
      timeoutId = setTimeout(onClose, 3000);
    }
  }, [props.show]);
  const close = () => {
    clearTimeout(timeoutId);
    props.handleClose();
  };
  return (
    <Modal centered show={props.show} onHide={close}>
      <SuccessFeedback msg={props.msg} />
    </Modal>
  );
};
export default SuccessModal;
