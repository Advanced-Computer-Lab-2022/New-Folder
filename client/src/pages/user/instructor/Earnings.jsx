import { useState, useEffect } from "react";
import { getEarnings } from "../../../network";
import EarningsCard from "../../../components/EarningsCard/EarningsCard";
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
      <PageHeader pageName="Earnings" extra="hii" />
      {earnings.map((earning) => (
        <EarningsCard year={earning.year} months={earning.months} />
      ))}
    </div>
  );
};

export default Earnings;
