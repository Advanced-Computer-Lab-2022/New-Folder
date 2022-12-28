import React from "react";
import { useState, useEffect } from "react";
import { fetchReports } from "../../network";
import ProblemCard from "../../components/ProblemCard/ProblemCard";
import { Col, NavDropdown, Row, Tab, Tabs } from "react-bootstrap";

function Reports() {
  const [unresolved, setUnresolved] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [selected, setSelected] = useState("Unresolved reports");
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

  const UnresolvedReports = () => (
    <div id="gridContainer">
      <Row xs={1} md={2}>
        {unresolved.map((report) => (
          <Col>
            <ProblemCard problem={report} getReports={getReports} />
          </Col>
        ))}
      </Row>
    </div>
  );

  const ResolvedReports = () => (
    <div id="gridContainer">
      <Row xs={1} md={2}>
        {resolved.map((report) => (
          <Col>
            <ProblemCard problem={report} />
          </Col>
        ))}
      </Row>
    </div>
  );
  return (
    <div>
      <NavDropdown id="nav-dropdown-dark-example" title={selected}>
        <NavDropdown.Item>Unresolved reports</NavDropdown.Item>
        <NavDropdown.Item>Resolved reports</NavDropdown.Item>
      </NavDropdown>
      {selected === "Resolved reports" ? (
        <ResolvedReports />
      ) : (
        <UnresolvedReports />
      )}
    </div>
  );
}

export default Reports;
