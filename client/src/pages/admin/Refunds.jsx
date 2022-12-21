import React from "react";
import { useState, useEffect } from "react";
import { getRefunds } from "../../network";
import ProblemCard from "../../components/ProblemCard/ProblemCard";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

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
      {refunds.map((refund) => (
        <h1>{refund.reason}</h1>
      ))}
    </>
  );
}

export default Reports;
