import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Stack from "react-bootstrap/esm/Stack";
import { postMultiPromotion, fetchExploreData } from "../../network";
import "react-day-picker/dist/style.css";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { DayPicker } from "react-day-picker";
import "./AdminSetPromotion.css";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { FormControl, FormControlLabel, FormGroup } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import SuccessFeedback from "../SuccessFeedback/SuccessFeedback";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AdminSetPromotion(props) {
  const { show, setShow } = props;
  const [range, setRange] = useState(null);
  const [newPercentage, setNewPercentage] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [selectError, setSelectError] = useState(null);
  const [percentageError, setPercentageError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [editing, setEditing] = useState(true);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      const fetchedCourses = await fetchExploreData();
      setCourses(fetchedCourses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  let timeoutId;
  useEffect(() => {
    if (success) {
      timeoutId = setTimeout(cancel, 3000);
    }
  }, [success]);
  const save = async () => {
    if (selectedCourses.length <= 0) {
      setSelectError("Please select at least 1 course");
      return;
    }
    setSelectError(null);
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
    const coursesIds = selectedCourses.map((course) => course._id);
    await postMultiPromotion(coursesIds, addedPromotion);
    setNewPercentage(null);
    setRange(null);
    setSelectedCourses([]);
    setAllSelected(false);
    setEditing(false);
    setSuccess(true);
    setLoading(false);
  };
  const cancel = () => {
    clearTimeout(timeoutId);
    if (success) {
      window.location.reload();
      return;
    }
    setPercentageError(null);
    setDateError(null);
    setShow(false);
    setNewPercentage(null);
    setRange(null);
    setSelectedCourses([]);
    setAllSelected(false);
    setSelectError(null);
    setEditing(true);
    setSuccess(false);
    setShow(false);
    setLoading(false);
  };
  return (
    <div>
      <>
        <Modal
          show={show}
          onHide={cancel}
          size={"lg"}
          centered
          backdrop={loading ? "static" : "dynamic"}
        >
          {!editing ? (
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
                <Modal.Title>Set promotion</Modal.Title>
              </Modal.Header>
              <div>
                <Autocomplete
                  multiple
                  disabled={allSelected}
                  id="checkboxes-tags-demo"
                  options={courses}
                  disableCloseOnSelect
                  value={allSelected ? [] : selectedCourses}
                  onChange={(event, value) => {
                    setSelectedCourses(value);
                  }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  style={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="standard-basic"
                      variant="standard"
                      label={
                        allSelected ? "All courses selected" : "Select courses"
                      }
                    />
                  )}
                />

                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row sx={{ margin: 0 }}>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={allSelected}
                          onChange={() => {
                            allSelected
                              ? setSelectedCourses([])
                              : setSelectedCourses(courses);
                            setAllSelected(!allSelected);
                          }}
                          sx={{ padding: 0, marginLeft: 1 }}
                        />
                      }
                      label="Select all"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
                {selectError ? (
                  <p className="promotionError">{selectError}</p>
                ) : null}
              </div>
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
    </div>
  );
}

export default AdminSetPromotion;
