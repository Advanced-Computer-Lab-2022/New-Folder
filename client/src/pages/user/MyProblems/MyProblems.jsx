import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import PageHeader from "../../../components/PageHeader/PageHeader";
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
    <>
      <PageHeader pageName="Reported Issues" />
      <div id="gridContainer">
        {problems.map((problem) => (
          <ProblemCard problem={problem} />
        ))}
      </div>
    </>
  );
}

export default MyProblems;
