import { useState, useEffect } from "react";
import { getEarnings } from "../../../network";
import EarningsCard from "../../../components/EarningsCard/EarningsCard";

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
      {earnings.map((earning) => (
        <EarningsCard year={earning.year} months={earning.months} />
      ))}
    </div>
  );
};

export default Earnings;
