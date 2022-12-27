import "./PaymentConfirmation.css";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { payForCourse } from "../../network";
import { ReactSession } from "react-client-session";
import countryCurrency from "../../constants/CountryCurrency.json";
import ErrorModal from "../ErrorModal/ErrorModal";

const PaymentConfirmation = (props) => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleClose = () => props.setShow(false);

  const submit = async () => {
    setLoading(true);
    try {
      const checkout = await payForCourse({
        courseID: props.courseId,
        userCurrency:
          countryCurrency.country_currency[ReactSession.get("country")],
      });
      setLoading(false);
      handleClose();
      window.location.href = checkout.url;
    } catch (e) {
      setLoading(false);
      handleClose();
      setShowError(true);
      console.log(e);
    }
  };
  return (
    <>
      <Modal
        centered
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Payment confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mt-3 mb-3">{props.msg}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="greyBg greyBgHover"
            disabled={loading}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={loading}
            className="blueBg blueBgHover"
          >
            Confirm{" "}
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                className="ms-1"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
          </Button>
        </Modal.Footer>
      </Modal>
      <ErrorModal show={showError} handleClose={() => setShowError(false)} />
    </>
  );
};
export default PaymentConfirmation;
