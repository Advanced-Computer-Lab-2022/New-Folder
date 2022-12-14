import React from "react";
import { useState, useEffect } from "react";
import { fetchReports } from "../../network";
import ProblemCard from "../../components/ProblemCard/ProblemCard";
import { Col, Row } from "react-bootstrap";

function Reports() {
  const [reports, setReports] = useState([]);
  const getReports = async () => {
    try {
      const fetchedReports = await fetchReports();
      console.log(fetchedReports);
      setReports(fetchedReports);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getReports();
  }, []);
  return (
    <div id="gridContainer">
      <Row xs={1} md={2}>
        {reports.map((report) => (
          <Col>
            <ProblemCard problem={report} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Reports;
