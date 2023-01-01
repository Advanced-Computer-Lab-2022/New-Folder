import React from "react";
import { useState, useEffect } from "react";
import { fetchReports } from "../../network";
import ProblemCard from "../../components/ProblemCard/ProblemCard";
import {
  Col,
  Image,
  NavDropdown,
  Row,
  Stack,
  Tab,
  Tabs,
} from "react-bootstrap";

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
      {unresolved.map((report) => (
        <ProblemCard problem={report} getReports={getReports} />
      ))}
    </div>
  );

  const ResolvedReports = () => (
    <div id="gridContainer">
      {resolved.map((report) => (
        <ProblemCard problem={report} />
      ))}
    </div>
  );
  return (
    <div>
      <NavDropdown
        style={{
          marginRight: "2.7%",
          marginBottom: "1.2%",
          fontSize: "18px",
          fontWeight: "500",
        }}
        align="end"
        drop="bottom"
        className="text-end"
        title={selected}
        onSelect={(e) => setSelected(e)}
      >
        <NavDropdown.Item eventKey="Unresolved reports">
          Unresolved reports
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="Resolved reports">
          Resolved reports
        </NavDropdown.Item>
      </NavDropdown>
      {selected === "Resolved reports" ? (
        <>
          {resolved.length === 0 ? (
            <div className="pt-3">
              <Stack className="mt-5" gap={3}>
                <Image width={"30%"} src="/assets/Empty.png" />
                <h2 className="m-auto">There are no resolved reports</h2>
              </Stack>
            </div>
          ) : (
            <ResolvedReports />
          )}
        </>
      ) : (
        <>
          {unresolved.length === 0 ? (
            <div className="pt-3">
              <Stack className="mt-5" gap={3}>
                <Image width={"30%"} src="/assets/Empty.png" />
                <h2 className="m-auto">There are no unresolved reports</h2>
              </Stack>
            </div>
          ) : (
            <UnresolvedReports />
          )}
        </>
      )}
    </div>
  );
}

export default Reports;
