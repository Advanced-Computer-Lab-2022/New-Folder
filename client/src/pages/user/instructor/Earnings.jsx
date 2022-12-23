import { useState, useEffect } from "react";
import { getEarnings } from "../../../network";
import EarningsCard from "../../../components/EarningsCard/EarningsCard";
import EarningsGraph from "../../../components/EarningsGraph/EarningsGraph";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Earnings = () => {
  const [earnings, setEarnings] = useState([]);
  const fetchData = async () => {
    const data = await getEarnings();
    setEarnings(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <div></div>
      <Row>
        <Col>Earnings</Col>
        <Col>Earnings</Col>
      </Row>
      <EarningsGraph earnings={earnings} />
      {earnings.map((earning) => (
        <EarningsCard year={earning.year} months={earning.months} />
      ))}
    </Container>
  );
};

export default Earnings;
