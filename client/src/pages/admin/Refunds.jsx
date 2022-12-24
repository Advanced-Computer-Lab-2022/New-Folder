import React from "react";
import { useState, useEffect } from "react";
import { getRefunds } from "../../network";
import { Col, Row, Stack, Image } from "react-bootstrap";
import RefundInfoCard from "../../components/RefundInfoCard/RefundInfoCard";
import Spinner from "react-bootstrap/Spinner";
import colors from "../../colors.json";
import PageHeader from "../../components/PageHeader/PageHeader";

function Reports() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchRefunds = async () => {
    setLoading(true);
    try {
      const fetchedRefunds = await getRefunds();
      setRefunds(fetchedRefunds);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRefunds();
  }, []);
  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "20%" }}
        >
          <Spinner
            animation="border"
            className="text-center"
            style={{
              width: "5rem",
              height: "5rem",
              color: colors.black,
            }}
          />
        </div>
      ) : (
        <>
          {refunds.length > 0 ? (
            <>
              <PageHeader pageName="Refund requests" />
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
          ) : (
            <div className="pt-3">
              <Stack className="mt-5" gap={3}>
                <Image width={"30%"} src="/assets/Empty.jpg" />
                <h2 className="m-auto">There are no refund requests</h2>
              </Stack>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Reports;
