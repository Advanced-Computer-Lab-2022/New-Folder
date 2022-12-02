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
  const [isEditing, setEditing] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [newPercentage, setNewPercentage] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [percentage, setPercentage] = useState(null);
  useEffect(() => {
    setPercentage(props.promotion?.percentage);
    setStartDate(props.promotion?.startDate);
    setEndDate(props.promotion?.endDate);
  }, []);
  const save = async () => {
    setEditing(false);
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
    setPercentage(newPercentage);
    await postPromotion(props.courseId, {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      percentage: newPercentage,
    });
    setNewPercentage(null);
    setSelectedEndDate(null);
    setSelectedStartDate(null);
  };
  const cancel = async () => {
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
            />
            <DatePicker
              scrollableYearDropdown={true}
              showYearDropdown={true}
              showMonthDropdown={true}
              onSelect={(date) => setSelectedEndDate(date)}
              value={selectedEndDate}
            />
          </Stack>
          <Form.Group as={Col}>
            <Form.Control
              type="number"
              placeholder="min price"
              value={newPercentage ?? percentage ?? 0}
              onChange={(e) => setNewPercentage(e.target.value)}
            />
          </Form.Group>
        </>
      ) : (
        <div>
          <h5>
            <b>Course promotion: </b> {percentage ?? 0}%
          </h5>
          <h5>
            <b>Start Date: </b> {startDate?.toDateString() ?? ""}
          </h5>
          <h5>
            <b>End Date: </b> {endDate?.toDateString() ?? ""}
          </h5>
          <Button onClick={() => setEditing(true)}>Change promotion</Button>
        </div>
      )}
    </div>
  );
}

export default AddPromotion;
