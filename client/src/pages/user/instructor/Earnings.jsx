import { useState, useEffect } from "react";
import { getEarnings } from "../../../network";
import EarningsCard from "../../../components/EarningsCard/EarningsCard";
import EarningsGraph from "../../../components/EarningsGraph/EarningsGraph";

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
      <EarningsGraph earnings={earnings} />
      {earnings.map((earning) => (
        <EarningsCard year={earning.year} months={earning.months} />
      ))}
    </div>
  );
};

export default Earnings;
