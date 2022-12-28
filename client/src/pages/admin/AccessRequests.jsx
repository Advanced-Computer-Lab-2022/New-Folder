import React, { useEffect, useState } from "react";
import AccessRequestCard from "../../components/AccessRequestCard/AccessRequestCard";
import { getRefunds } from "../../network";
import { Col, Row, Stack, Image } from "react-bootstrap";
import RefundInfoCard from "../../components/RefundInfoCard/RefundInfoCard";
import Spinner from "react-bootstrap/Spinner";
import colors from "../../colors.json";
import PageHeader from "../../components/PageHeader/PageHeader";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { fetchRequests } from "../../network";

function AccessRequests() {
  const [accessRequests, setAccessRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [msg, setMsg] = useState(null);
  const [fetchFail, setFetchFail] = useState(false);
  const getRequests = async () => {
    setLoading(true);
    try {
      const fetchedRequests = await fetchRequests();
      setAccessRequests(fetchedRequests);
    } catch (err) {
      setFetchFail(true);
    }
    setLoading(false);
  };
  const close = () => {
    setSuccess(false);
    setFail(false);
    setFetchFail(false);
  };
  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      <SuccessModal show={success} msg={msg} handleClose={close} />
      <ErrorModal show={fail || fetchFail} handleClose={close} />
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
          {accessRequests.length > 0 ? (
            <>
              <div id="gridContainer">
                <Row xs={1} md={3}>
                  {accessRequests.map((request) => (
                    <Col>
                      <AccessRequestCard
                        accessRequests={accessRequests}
                        setAccessRequests={setAccessRequests}
                        request={request}
                        setFail={setFail}
                        setSuccess={setSuccess}
                        setMsg={setMsg}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </>
          ) : (
            <div className="pt-3">
              <Stack className="mt-5" gap={3}>
                <Image width={"30%"} src="/assets/Empty.png" />
                <h2 className="m-auto">There are no access requests</h2>
              </Stack>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AccessRequests;
