import { useState, useEffect } from "react";
import { postCourse } from "../../../network";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import CountryCurrency from "iso-country-currency";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

const countries = CountryCurrency.getAllISOCodes();

function CreateCourse() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");
  const [magnitude, setMagnitude] = useState("");
  const [currency, setCurrency] = useState("EGP");
  const [subtitles, setSubtitles] = useState([""]);

  const removeSubtitle = (index) => {
    const temp = [...subtitles];

    // removing the element using splice
    temp.splice(index, 1);

    // updating the list
    setSubtitles(temp);
  };

  const onSubmit = (e) => {
    const data = {
      name: name,
      field: field,
      description: description,
      magnitude: magnitude,
      currency: currency,
      subtitles: subtitles,
    };
    postCourse(data);
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Container className="mt-4">
          <Col lg="5">
            <Form.Group className="">
              <Form.Label>Create Course</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Enter Course Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="field"
                name="field"
                value={field}
                placeholder="Enter Course Field"
                onChange={(e) => setField(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                id="description"
                name="description"
                value={description}
                placeholder="Enter Course Description"
                onChange={(e) => setDescription(e.target.value)}
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
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button
                      className="btn btn-danger "
                      onClick={() => removeSubtitle(index)}
                    >
                      x
                    </Button>
                  </Form.Group>
                </Row>
              );
            })}
            <Form.Group className="mb-3">
              <Button
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
                placeholder="Enter your price magnitude"
                onChange={(e) => setMagnitude(e.target.value)}
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
            </Form.Group>
          </Col>
        </Container>
      </Form>
    </div>
  );
}

export default CreateCourse;
