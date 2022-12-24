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
import SuccessFeedback from "../../SuccessFeedback/SuccessFeedback";
import Spinner from "react-bootstrap/Spinner";
function AddPromotion(props) {
  const { promotion, setPromotion, courseId } = props;
  const [isEditing, setEditing] = useState(false);
  const [range, setRange] = useState(null);
  const [newPercentage, setNewPercentage] = useState(null);
  const [valid, setValid] = useState(false);
  const [dateError, setDateError] = useState(null);
  const [percentageError, setPercentageError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setDateError(null);
    if (!newPercentage) {
      setPercentageError("Please add a percentage!");
      return;
    }
    if (newPercentage > 100 || newPercentage <= 0) {
      setPercentageError("Percentage must be between 0-100!");
      return;
    }
    setLoading(true);
    setPercentageError(null);
    const addedPromotion = {
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      percentage: newPercentage,
    };
    postPromotion(courseId, addedPromotion).then(() => {
      setLoading(false);
      setPromotion(addedPromotion);
      setNewPercentage(null);
      setRange(null);
      setEditing(false);
      setSuccess(true);
    });
  };
  const cancel = () => {
    setShow(false);
    setEditing(false);
    setPercentageError(null);
    setDateError(null);
    setNewPercentage(null);
    setRange(null);
    setSuccess(false);
  };

  return (
    <div>
      <>
        <Modal
          show={show}
          onHide={cancel}
          centered
          backdrop={loading ? "static" : "dynamic"}
        >
          {!isEditing ? (
            <>
              {success ? (
                <SuccessFeedback
                  msg="Promotion added successfully!"
                  onClose={cancel}
                />
              ) : null}
            </>
          ) : (
            <>
              <Modal.Header>
                <Modal.Title>Add promotion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6 id="addPromotionHeader">Select start and end dates:</h6>
                <Stack direction="vertical" gap={1}>
                  <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    disabled={[
                      {
                        from: new Date(1900, 4, 18),
                        to: new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          new Date().getDate() - 1
                        ),
                      },
                    ]}
                  />
                </Stack>
                {dateError ? (
                  <p className="promotionError">{dateError}</p>
                ) : null}
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
                <Button variant="secondary" onClick={cancel} disabled={loading}>
                  Close
                </Button>
                {loading ? (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    {" Saving..."}
                  </Button>
                ) : (
                  <Button variant="primary" onClick={save}>
                    Save Changes
                  </Button>
                )}
              </Modal.Footer>
            </>
          )}
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
            <Button
              variant="primary"
              onClick={() => {
                setEditing(true);
                setShow(true);
              }}
            >
              Change promotion
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            onClick={() => {
              setEditing(true);
              setShow(true);
            }}
          >
            Add promotion
          </Button>
        )}
      </>
    </div>
  );
}

export default AddPromotion;
