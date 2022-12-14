import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProblemCard from "../../../components/ProblemCard/ProblemCard";
import { getMyProblems } from "../../../network";
import "./MyProblems.css";
function MyProblems() {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    fetchProblems();
  }, []);
  const fetchProblems = async () => {
    const fetchedProblems = await getMyProblems();
    setProblems(fetchedProblems);
  };
  return (
    <div id="gridContainer">
      <Row xs={1} md={2}>
        {problems.map((problem) => (
          <Col>
            <ProblemCard problem={problem} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MyProblems;
