import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { fetchVideoContent } from "../../../../network";
import { getYoutubeVideoID } from "../../../../utils/getVideoDurationUtils";
import "./VideoAndDescription.css";

const VideoAndDescription = (props) => {
  // get contentID passed from props
  const contentID = props.contentFetched;
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const setParentContentTitle = props.setParentContentTitle;

  // get content from database and then display video and title
  const fetchingContent = async () => {
    try {
      const fetchedContent = await fetchVideoContent(contentID);

      {
        /* get video id from youtube API and concatenate it to https://www.youtube.com/embed/*/
      }
      setVideo(
        "https://www.youtube.com/embed/" +
          getYoutubeVideoID(fetchedContent.video)
      );
      setDescription(fetchedContent.description);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchingContent();
  }, []);

  useEffect (()=>{
    setParentContentTitle(description);
  },[description])

  // only video and video title are dislayed here
  // there is a button for next video is commented till further discussions
  return (
    <div id="videaAndDescription" >
      <div className="watchScreen__player">
        <iframe
          src={video}
          frameborder="0"
          title="My Video"
          allowFullScreen
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div class="watchScreen__description">
        <i class="bi bi-play-circle-fill"></i>
        <span>{description}</span>
        {/* <button type="button" class="btn btn-primary">Next Video</button> */}
      </div>
    </div>
  );
};

export default VideoAndDescription;
