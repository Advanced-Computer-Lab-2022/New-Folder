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
import ErrorFeedback from "../../ErrorFeedback/ErrorFeedback";
import { TbDiscount2 } from "react-icons/tb";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { BsArrowRight } from "react-icons/bs";
import { ImPencil } from "react-icons/im";
import "../../../App.css";
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
  const [fail, setFail] = useState(false);
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
  let timeoutId;
  useEffect(() => {
    if (success || fail) {
      timeoutId = setTimeout(cancel, 3000);
    }
  }, [success, fail]);
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
    try {
      await postPromotion(courseId, addedPromotion);
      setPromotion(addedPromotion);
      setNewPercentage(null);
      setRange(null);
      setEditing(false);
      setSuccess(true);
    } catch (err) {
      setFail(true);
    }
    setLoading(false);
  };
  const cancel = () => {
    clearTimeout(timeoutId);
    setShow(false);
    setEditing(false);
    setPercentageError(null);
    setDateError(null);
    setNewPercentage(null);
    setRange(null);
    setSuccess(false);
    setFail(false);
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
              ) : (
                <>{fail ? <ErrorFeedback onClose={cancel} /> : null}</>
              )}
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
                <Button
                  id="addPromotionCloseButton"
                  className="greyBg greyBgHover"
                  onClick={cancel}
                  disabled={loading}
                >
                  Close
                </Button>
                {loading ? (
                  <Button
                    id="addPromotionSaveButton"
                    className="blueBg blueBgHover"
                    disabled
                  >
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
                  <Button
                    id="addPromotionSaveButton"
                    className="blueBg blueBgHover"
                    onClick={save}
                  >
                    Save Changes
                  </Button>
                )}
              </Modal.Body>
            </>
          )}
        </Modal>
      </>

      <div className="mb-3">
        <h4>
          Course promotion
          <ImPencil
            onClick={() => {
              setEditing(true);
              setShow(true);
            }}
            size={15}
            style={{ marginTop: -5, marginLeft: 10 }}
            id="editPromotionButton"
          />
        </h4>
        <div>
          {valid ? (
            <>
              <h5>
                {" "}
                <TbDiscount2
                  size={20}
                  style={{ marginTop: -5, marginRight: 3 }}
                />
                {promotion.percentage + " %"}
              </h5>
              <h5>
                <HiOutlineCalendarDays
                  size={20}
                  style={{ marginTop: -5, marginRight: 3 }}
                />
                {new Date(promotion?.startDate).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }) ?? ""}
                <BsArrowRight
                  style={{ marginTop: -5, marginRight: 3, marginLeft: 3 }}
                />
                {new Date(promotion?.endDate).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }) ?? ""}
              </h5>
            </>
          ) : (
            <>
              <h5>
                There are no promotions for this <br /> course.
              </h5>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddPromotion;
