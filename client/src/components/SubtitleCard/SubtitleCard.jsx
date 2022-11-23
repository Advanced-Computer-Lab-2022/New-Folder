import React from "react";
import { useState, useEffect } from "react";
import { fetchSubtitle } from "../../network";

function SubtitleCard(props) {
  const [subtitle, setSubtitle] = useState({});
  const getSubtitle = async () => {
    try {
      const fetchedSubtitle = await fetchSubtitle(props.subtitleId);
      setSubtitle(fetchedSubtitle);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSubtitle();
  }, []);

  return <div>{subtitle.subtitleNumber}</div>;
}

export default SubtitleCard;
