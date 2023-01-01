import React, { useEffect } from "react";
import { FetchContentVisit } from "../../../../network";

const VisitedCard = (props) => {
  const contentType = props.contentType;
  const contentID = props.contentID;
  const setIsVisited = props.setIsVisited;
  const isVisited = props.isVisited;

  const fetchingVisits = async () => {
    const visited = await FetchContentVisit(contentID, contentType);
    setIsVisited(visited);
  };

  useEffect(() => {
    fetchingVisits();
  }, []);

  return (
    <div className="Content-card-visit">
      <i
        class={
          isVisited
            ? "bi bi-check-square-fill icon-visited-checkBox"
            : "bi bi-square"
        }
      ></i>
    </div>
  );
};

export default VisitedCard;
