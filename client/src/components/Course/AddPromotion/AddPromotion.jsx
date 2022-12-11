import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Stack from "react-bootstrap/esm/Stack";
import { postPromotion } from "../../../network";
import "react-day-picker/dist/style.css";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { DayPicker } from "react-day-picker";
import "./AddPromotion.css";

function AddPromotion(props) {
  const { promotion, setPromotion, courseId } = props;
  const [isEditing, setEditing] = useState(false);
  const [range, setRange] = useState(null);
  const [newPercentage, setNewPercentage] = useState(null);
  const [valid, setValid] = useState(false);
  const [dateError, setDateError] = useState(null);
  const [percentageError, setPercentageError] = useState(null);
  useEffect(() => {
    if (
      promotion?.startDate <= promotion?.endDate &&
      new Date(promotion?.endDate).getTime() >= Date.now() &&
      promotion?.percentage > 0
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [promotion]);
  const save = async () => {
    const startDate = new Date(range?.from).getTime();
    const endDate = new Date(range?.to).getTime();
    if (!startDate) {
      setDateError("Start date is missing!");
      return;
    }
    if (!endDate) {
      setDateError("End date is missing!");
      return;
    }
    if (startDate > endDate) {
      setDateError("End date can not be before start date!");
      return;
    }
    if (endDate < Date.now()) {
      setDateError("This promotion is in the past!");
      return;
    }
    setDateError(null);
    if (!newPercentage) {
      setPercentageError("Please add a percentage!");
      return;
    }
    if (newPercentage > 100 || newPercentage < 0) {
      setPercentageError("Percentage must be between 0-100!");
      return;
    }
    setPercentageError(null);
    setEditing(false);
    const addedPromotion = {
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      percentage: newPercentage,
    };
    setPromotion(addedPromotion);
    setNewPercentage(null);
    setRange(null);
    await postPromotion(courseId, addedPromotion);
  };
  const cancel = async () => {
    setPercentageError(null);
    setDateError(null);
    setEditing(false);
    setNewPercentage(null);
    setRange(null);
  };
  return (
    <div>
      <>
        <Modal
          show={isEditing}
          onHide={() => setEditing(false)}
          size={"lg"}
          centered
        >
          <Modal.Header>
            <Modal.Title>Add promotion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6 id="addPromotionHeader">Select duration:</h6>
            <Stack direction="vertical" gap={1}>
              <DayPicker mode="range" selected={range} onSelect={setRange} />
            </Stack>
            {dateError ? <p className="promotionError">{dateError}</p> : null}
            <Form.Group as={Col}>
              <Form.Control
                type="number"
                placeholder="Promotion %"
                value={newPercentage}
                onChange={(e) => setNewPercentage(e.target.value)}
              />
              {percentageError ? (
                <p className="promotionError">{percentageError}</p>
              ) : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancel}>
              Close
            </Button>
            <Button variant="primary" onClick={save}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <>
        {valid ? (
          <div>
            <h5>
              <b>Course promotion: </b> {promotion?.percentage ?? 0}%
            </h5>
            <h5>
              <b>Promotion Start Date: </b>{" "}
              {new Date(promotion?.startDate).toDateString() ?? ""}
            </h5>
            <h5>
              <b>Promotion End Date: </b>{" "}
              {new Date(promotion?.endDate).toDateString() ?? ""}
            </h5>
            <Button variant="primary" onClick={() => setEditing(true)}>
              Cahnge promotion
            </Button>
          </div>
        ) : (
          <Button variant="primary" onClick={() => setEditing(true)}>
            Add promotion
          </Button>
        )}
      </>
    </div>
  );
}

export default AddPromotion;
