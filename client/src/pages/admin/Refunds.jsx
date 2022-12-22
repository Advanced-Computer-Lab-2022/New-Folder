import React from "react";
import { useState, useEffect } from "react";
import { getRefunds } from "../../network";
import ProblemCard from "../../components/ProblemCard/ProblemCard";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import RefundInfoCard from "../../components/RefundInfoCard/RefundInfoCard";

function Reports() {
  const [refunds, setRefunds] = useState([]);
  const fetchRefunds = async () => {
    try {
      const fetchedRefunds = await getRefunds();
      console.log(fetchedRefunds);
      setRefunds(fetchedRefunds);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);
  return (
    <>
      <div id="gridContainer">
        <Row xs={1} md={3}>
          {refunds.map((refund) => (
            <Col>
              <RefundInfoCard
                request={refund}
                allRefunds={refunds}
                setAllRefunds={setRefunds}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Reports;
