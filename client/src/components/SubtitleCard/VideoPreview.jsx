import React from "react";
import { useState, useEffect } from "react";
import { fetchVideoContent } from "../../network";

function VideoPreview(props) {
  const [video, setVideo] = useState({});

  const fetchVideo = async () => {
    try {
      const fetchedVideo = await fetchVideoContent(props.videoId);
      setVideo(fetchedVideo);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchVideo();
  }, []);
  return (
    <h6>
      <ul>
        <li>{"Video Duration: " + video.duration + " hrs"}</li>
        <li>{"Video Description: " + video.description}</li>
        <li>
          <a href={"/subtitle/" + props.subtitleId + "?idx=" + props.idx}>
            watch here
          </a>
        </li>
      </ul>
    </h6>
  );
}

export default VideoPreview;
