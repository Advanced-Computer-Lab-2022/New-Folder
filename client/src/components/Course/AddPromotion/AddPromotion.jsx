import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Stack from "react-bootstrap/esm/Stack";
import DatePicker from "react-datepicker";
import { postPromotion } from "../../../network";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
function AddPromotion(props) {
  const { promotion, setPromotion, courseId } = props;
  const [isEditing, setEditing] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [newPercentage, setNewPercentage] = useState(null);
  const save = async () => {
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
              value={newPercentage ?? promotion?.percentage ?? 0}
              onChange={(e) => setNewPercentage(e.target.value)}
            />
          </Form.Group>
        </>
      ) : (
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
      )}
    </div>
  );
}

export default AddPromotion;
