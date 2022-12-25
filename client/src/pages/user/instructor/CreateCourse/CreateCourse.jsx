import { useState, useEffect } from "react";
import { postCourse } from "../../../../network";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import CountryCurrency from "iso-country-currency";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import CloseButton from "react-bootstrap/CloseButton";
import ContractCard from "../../../../components/ContractCard/ContractCard";
import PageHeader from "../../../../components/PageHeader/PageHeader";
import "./CreateCourse.css";
import SuccessModal from "../../../../components/SuccessModal/SuccessModal";
import ErrorModal from "../../../../components/ErrorModal/ErrorModal";
import { Spinner } from "react-bootstrap";
const countries = CountryCurrency.getAllISOCodes();

function CreateCourse() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");
  const [magnitude, setMagnitude] = useState("");
  const [currency, setCurrency] = useState("EGP");
  const [subtitles, setSubtitles] = useState([""]);
  const [introVideo, setIntroVideo] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  //terms and conditions
  const [show, setShow] = useState(false);

  const removeSubtitle = (index) => {
    const temp = [...subtitles];

    // removing the element using splice
    temp.splice(index, 1);

    // updating the list
    setSubtitles(temp);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setLoading(true);
    try {
      const data = {
        name: name,
        field: field,
        description: description,
        magnitude: magnitude,
        currency: currency,
        subtitles: subtitles,
        introVideo: introVideo,
        image: courseImage,
      };
      await postCourse(data);
      setSuccess(true);
    } catch (err) {
      setFail(true);
    }
    setLoading(false);
  };
  const close = () => {
    setFail(false);
    setSuccess(false);
    navigate("/");
  };
  return (
    <>
      <PageHeader pageName="Create course" />
      <SuccessModal
        msg="Course created successfully!"
        handleClose={close}
        show={success}
      />
      <ErrorModal handleClose={close} show={fail} />
      <Form onSubmit={onSubmit} noValidate validated={validated}>
        <Col md="4" id="createCourseWrapper">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={name}
              placeholder="Course Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={field}
              placeholder="Course Field"
              onChange={(e) => setField(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={introVideo}
              placeholder="Course preview link"
              onChange={(e) => setIntroVideo(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={courseImage}
              placeholder="Course Image Link"
              onChange={(e) => setCourseImage(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              placeholder="Course Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          {subtitles.map((sub, index) => {
            return (
              <Row>
                <Form.Group className="mb-3" as={Col} md="11">
                  <Form.Control
                    type="text"
                    id={"subtitle" + index}
                    value={subtitles[index]}
                    name={"subtitle" + index}
                    placeholder="Enter subtitle"
                    onChange={(e) => {
                      const temp = [...subtitles];
                      temp[index] = e.target.value;
                      setSubtitles(temp);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className="mt-2">
                  <CloseButton onClick={() => removeSubtitle(index)} />
                </Form.Group>
              </Row>
            );
          })}
          <Form.Group className="mb-3">
            <Button
              id="addSubtitleButton"
              onClick={(e) => {
                setSubtitles([...subtitles, ""]);
              }}
              disabled={loading}
            >
              Add Subtitle
            </Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              id="magnitude"
              name="magnitude"
              value={magnitude}
              placeholder="Course price"
              onChange={(e) => setMagnitude(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              This field is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select
              id="currency"
              name="currency"
              onChange={(e) => {
                console.log(e.target.value);
                setCurrency(e.target.value);
              }}
            >
              {countries.map((country) => (
                <option
                  selected={country.currency === currency}
                  value={country.currency}
                >
                  {country.countryName + " (" + country.currency + ")"}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            {loading ? (
              <Button type="submit" id="createCourseSaveButton" disabled>
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
              <Button type="submit" id="createCourseSaveButton">
                Create course
              </Button>
            )}
            {/* <ContractCard submit={submit} show={show} setShow={setShow} /> */}
          </Form.Group>
        </Col>
      </Form>
    </>
  );
}

export default CreateCourse;
