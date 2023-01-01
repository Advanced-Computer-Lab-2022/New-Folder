import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Image, Row, Stack } from "react-bootstrap";
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
      {problems.length > 0 ? (
        <div id="gridContainer">
          {problems.map((problem) => (
            <ProblemCard problem={problem} />
          ))}
        </div>
      ) : (
        <div className="pt-5">
          <Stack className="mt-5" gap={3}>
            <Image width={"23%"} src="/assets/Empty.png" />
            <h4 className="m-auto mt-2">You haven't reported any issues</h4>
          </Stack>
        </div>
      )}
    </>
  );
}

export default MyProblems;
