import { useState, useEffect } from "react";
import { getEarnings } from "../../../network";

const Earnings = () => {
  const [earnings, setEarnings] = useState([]);
  const fetchData = async () => {
    const data = await getEarnings();
    setEarnings(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <></>;
};

export default Earnings;
