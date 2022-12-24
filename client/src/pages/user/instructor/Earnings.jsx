import { useState, useEffect } from "react";
import { getEarnings } from "../../../network";
import EarningsCard from "../../../components/EarningsCard/EarningsCard";
import EarningsGraph from "../../../components/EarningsGraph/EarningsGraph";
import PageHeader from "../../../components/PageHeader/PageHeader";
import EarningsDropdown from "../../../components/EarningsDropdown/EarningsDropdown";
import { Image, Spinner, Stack } from "react-bootstrap";

const Earnings = () => {
  const [earnings, setEarnings] = useState([]);
  const [year, setYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState(null);
  const fetchData = async () => {
    const data = await getEarnings();
    setEarnings(data);
    setLoading(false);
    if (data.length > 0) setYear(data[0]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let data = new Map();
    year?.months.forEach((m, index) => {
      m.payments.forEach((p) => {
        let oldValue = data.get(p.currency) ?? [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];
        oldValue[index] += p.magnitude;
        data.set(p.currency, oldValue);
      });
    });
    setGraphData(data);
  }, [year]);
  return (
    <div>
      {loading ? (
        <Stack className="m-4">
          <Spinner animation="border" />
        </Stack>
      ) : (
        <div>
          <PageHeader
            pageName="Earnings"
            extra={<EarningsDropdown years={earnings} setYear={setYear} />}
          />
          {earnings.length > 0 ? (
            <div className="mt-5">
              <EarningsGraph data={graphData} />
              <EarningsCard months={year.months} />
            </div>
          ) : (
            <div className="pt-3">
              <Stack className="mt-5" gap={3}>
                <Image width={"30%"} src="/assets/Banknote.gif" />
                <h2 className="m-auto">You don't have any earnings yet</h2>
              </Stack>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Earnings;
