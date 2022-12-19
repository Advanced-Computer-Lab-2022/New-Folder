import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AccessRequestCard from "../../components/AccessRequestCard/AccessRequestCard";
import {fetchRequests} from "../../network"

function AccessRequests() {
  const [accessRequests, setAccessRequests] = useState([]);

  const getRequests = async()=>{
    try{
      const fetchedRequests = await fetchRequests();
      setAccessRequests(fetchedRequests);
      console.log(fetchedRequests);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getRequests();
  },[])

  return (
    <>
      <div id="gridContainer">
        <Row xs={1} md={3}>
          {accessRequests.map((request) => (
            <Col>
              <AccessRequestCard request={request} getRequests={getRequests}/>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default AccessRequests;
