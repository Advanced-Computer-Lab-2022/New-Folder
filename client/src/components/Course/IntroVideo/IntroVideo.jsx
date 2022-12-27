import React from "react";
import { getYoutubeVideoID } from "../../../utils/getVideoDurationUtils";

function IntroVideo(props) {
  const { introVideo } = props;
  return (
    <div id="introVideoWrapper">
      {introVideo !== "" && (
        <iframe
          style={{
            borderRadius: 8,
            height: 250,
            width: 400,
          }}
          src={
            "https://www.youtube.com/embed/" +
            getYoutubeVideoID(introVideo ?? "")
          }
        ></iframe>
      )}
    </div>
  );
}

export default IntroVideo;
