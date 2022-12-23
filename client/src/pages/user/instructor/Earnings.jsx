import { useState, useEffect } from "react";
import { getEarnings } from "../../../network";
import EarningsCard from "../../../components/EarningsCard/EarningsCard";
import EarningsGraph from "../../../components/EarningsGraph/EarningsGraph";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageHeader from "../../../components/PageHeader/PageHeader";

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
    <div>
      <PageHeader pageName="Earnings" extra="" />
      <EarningsGraph earnings={earnings} />
      {earnings.map((earning) => (
        <EarningsCard year={earning.year} months={earning.months} />
      ))}
    </div>
  );
};

export default Earnings;
