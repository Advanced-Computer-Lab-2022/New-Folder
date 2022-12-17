import React, { useState } from "react";
import { useEffect } from "react";
import { fetchSubtitle } from "../../../network";
import VideoAndDescription from "./VideoAndDescription/VideoAndDescription";

const ContentDisplay = (props) => {
  // get ContentIDx and subtitle ID to get content
  const indexOfContent = props.cID;
  const subtitleID = props.subtitleContentDisplay;
  const [contentID, setContentID] = useState("");
  const setParentContentID = props.setParentContentID;

  // get the subtitle from data base and then get the index of desired content from subtitle_content
  const fetchingSubtitle = async () => {
    try {
      const fetchedSubtitle = await fetchSubtitle(subtitleID);
      setContentID(
        fetchedSubtitle.subTitle_Content[indexOfContent].subTitle_Content_id
      );
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchingSubtitle();
  }, []);

  useEffect (()=> {
    setParentContentID(contentID);
  },[contentID])

  // pass contentID to VideoAndDescription component
  return (
    <>{contentID != "" && <VideoAndDescription contentFetched={contentID} />}</>
  );
};

export default ContentDisplay;
