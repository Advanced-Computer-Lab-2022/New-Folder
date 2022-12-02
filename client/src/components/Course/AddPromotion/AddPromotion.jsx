import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Stack from "react-bootstrap/esm/Stack";
import DatePicker from "react-datepicker";
import { postPromotion } from "../../../network";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
function AddPromotion(props) {
  const { promotion, setPromotion, courseId } = props;
  const [isEditing, setEditing] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [newPercentage, setNewPercentage] = useState(null);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);
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
    const startDate = new Date(selectedStartDate).getTime();
    const endDate = new Date(selectedEndDate).getTime();
    if (!startDate) {
      setError("Start date is missing");
      return;
    }
    if (!endDate) {
      setError("End date is missing");
      return;
    }
    if (startDate > endDate) {
      setError("End date can not be before start date");
      return;
    }
    if (endDate < Date.now()) {
      setError("This promotion is in the past");
      return;
    }
    if (!newPercentage) {
      setError("Please add a percentage");
      return;
    }
    setError(null);
    setEditing(false);
    const addedPromotion = {
      startDate: new Date(selectedStartDate).getTime(),
      endDate: new Date(selectedEndDate).getTime(),
      percentage: newPercentage,
    };
    setPromotion(addedPromotion);
    setNewPercentage(null);
    setSelectedEndDate(null);
    setSelectedStartDate(null);
    await postPromotion(courseId, addedPromotion);
  };
  const cancel = async () => {
    setError(null);
    setEditing(false);
    setNewPercentage(null);
    setSelectedEndDate(null);
    setSelectedStartDate(null);
  };
  return (
    <div>
      {isEditing ? (
        <>
          <Button onClick={() => save()}>Save Changes</Button>
          <Button onClick={() => cancel()}>Discard changes</Button>
          <Stack direction="horizontal" gap={1}>
            <DatePicker
              scrollableYearDropdown={true}
              showYearDropdown={true}
              showMonthDropdown={true}
              onSelect={(date) => setSelectedStartDate(date)}
              value={selectedStartDate}
              adjustDateOnChange={true}
              selected={selectedStartDate}
              placeholderText={"Select start date"}
            />
            <DatePicker
              scrollableYearDropdown={true}
              showYearDropdown={true}
              showMonthDropdown={true}
              onSelect={(date) => setSelectedEndDate(date)}
              value={selectedEndDate}
              adjustDateOnChange={true}
              selected={selectedEndDate}
              placeholderText={"Select end date"}
            />
          </Stack>
          <Form.Group as={Col}>
            <Form.Control
              type="number"
              placeholder="Promotion %"
              value={newPercentage}
              onChange={(e) => setNewPercentage(e.target.value)}
            />
          </Form.Group>
        </>
      ) : (
        <>
          {valid ? (
            <div>
              <h5>
                <b>Course promotion: </b> {promotion?.percentage ?? 0}%
              </h5>
              <h5>
                <b>Start Date: </b>{" "}
                {new Date(promotion?.startDate).toDateString() ?? ""}
              </h5>
              <h5>
                <b>End Date: </b>{" "}
                {new Date(promotion?.endDate).toDateString() ?? ""}
              </h5>
              <Button onClick={() => setEditing(true)}>Change promotion</Button>
            </div>
          ) : (
            <Button onClick={() => setEditing(true)}>Add promotion</Button>
          )}
        </>
      )}
      {error ? <h6>Error: {error}</h6> : null}
    </div>
  );
}

export default AddPromotion;
