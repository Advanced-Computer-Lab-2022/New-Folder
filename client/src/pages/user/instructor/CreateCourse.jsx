import { useState, useEffect } from "react";
import { postCourse } from "../../../network";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import CountryCurrency from "iso-country-currency";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import CloseButton from "react-bootstrap/CloseButton";
import ContractCard from "../../../components/ContractCard/ContractCard";

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

  //terms and conditions
  const [show, setShow] = useState(false);

  const removeSubtitle = (index) => {
    const temp = [...subtitles];

    // removing the element using splice
    temp.splice(index, 1);

    // updating the list
    setSubtitles(temp);
  };

  const submit = () => {
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
    postCourse(data);
    navigate("/");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Container className="mt-4">
          <Col lg="5">
            <h3 className="mb-3">Create Course</h3>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter Course Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={field}
                placeholder="Enter Course Field"
                onChange={(e) => setField(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={introVideo}
                placeholder="Add Course preview link"
                onChange={(e) => setIntroVideo(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={courseImage}
                placeholder="Add Course Image Link"
                onChange={(e) => setCourseImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                placeholder="Enter Course Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            {subtitles.map((sub, index) => {
              return (
                <Row>
                  <Form.Group className="mb-3" as={Col}>
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
                  </Form.Group>
                  <Form.Group as={Col} className="mt-2">
                    {/* <Button
                      className="btn btn-danger "
                      onClick={() => removeSubtitle(index)}
                    >
                      x
                    </Button> */}
                    <CloseButton onClick={() => removeSubtitle(index)} />
                  </Form.Group>
                </Row>
              );
            })}
            <Form.Group className="mb-3">
              <Button
                variant="dark"
                onClick={(e) => {
                  setSubtitles([...subtitles, ""]);
                }}
              >
                Add Subtitle
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="magnitude"
                name="magnitude"
                value={magnitude}
                placeholder="Enter Course price"
                onChange={(e) => setMagnitude(e.target.value)}
                required
              />
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
              <Button variant="dark" type="submit">
                submit
              </Button>
              <ContractCard submit={submit} show={show} setShow={setShow} />
            </Form.Group>
          </Col>
        </Container>
      </Form>
    </div>
  );
}

export default CreateCourse;
