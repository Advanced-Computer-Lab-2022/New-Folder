import React, { useEffect } from "react";
import { FetchContentVisit } from "../../../../network";

const VisitedCard = (props) => {
    const contentType = props.contentType;
    const contentID = props.contentID;
    const setIsVisited = props.setIsVisited;
    const isVisited = props.isVisited;

    const fetchingVisits = async () => {
        const visited = await FetchContentVisit(contentID , contentType);
        setIsVisited(visited);
    } 
    
    useEffect(()=>{
        fetchingVisits();
    },[])



    return (
    <div className="Content-card-visit">
      {!isVisited &&<i class="bi bi-dot"></i>}
    </div>
  );
};

export default VisitedCard;
