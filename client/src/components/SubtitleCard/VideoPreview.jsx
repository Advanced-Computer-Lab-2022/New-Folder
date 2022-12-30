import React from "react";
import { useState, useEffect } from "react";
import { fetchVideoContent } from "../../network";
import { totalDuration } from "../../utils/getVideoDurationUtils";
import {
  BsFillPlayBtnFill,
  BsClockFill,
  BsFillPlayCircleFill,
  BsFillFileTextFill,
} from "react-icons/bs";
function VideoPreview(props) {
  const [video, setVideo] = useState({});

  const fetchVideo = async () => {
    try {
      const fetchedVideo = await fetchVideoContent(props.videoId);
      setVideo(fetchedVideo);

      await props.setDurationMap((oldMap) => {
        const map = new Map(oldMap);
        map.set(props.videoId, fetchedVideo.duration ?? 0);
        return map;
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchVideo();
  }, []);
  return (
    <div>
      <h5>
        <BsFillPlayCircleFill
          size={17}
          style={{ marginRight: 3, marginBottom: 3 }}
        />{" "}
        {video.title ?? "mango"}
      </h5>
      <h5>
        <BsClockFill size={17} style={{ marginBottom: 5, marginRight: 5 }} />
        {totalDuration(video.duration)}
      </h5>
      <h6 style={{ color: "grey" }}>{video.description}</h6>
    </div>
  );
}

export default VideoPreview;
