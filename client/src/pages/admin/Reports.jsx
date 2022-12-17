import React from "react";
import { useState, useEffect } from "react";
import { fetchReports } from "../../network";
import ProblemCard from "../../components/ProblemCard/ProblemCard";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

function Reports() {
  const [unresolved, setUnresolved] = useState([]);
  const [resolved, setResolved] = useState([]);
  const getReports = async () => {
    try {
      const fetchedReports = await fetchReports();
      setUnresolved(fetchedReports.unresolved);
      setResolved(fetchedReports.resolved);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getReports();
  }, []);
  return (
    <Tabs defaultActiveKey="unresolved" className="m-4" justify>
      <Tab eventKey="unresolved" title="Reports">
        <div id="gridContainer">
          <Row xs={1} md={2}>
            {unresolved.map((report) => (
              <Col>
                <ProblemCard problem={report} />
              </Col>
            ))}
          </Row>
        </div>
      </Tab>
      <Tab eventKey="Resolved" title="Resolved Reports">
        <div id="gridContainer">
          <Row xs={1} md={2}>
            {resolved.map((report) => (
              <Col>
                <ProblemCard problem={report} />
              </Col>
            ))}
          </Row>
        </div>
      </Tab>
    </Tabs>
  );
}

export default Reports;
