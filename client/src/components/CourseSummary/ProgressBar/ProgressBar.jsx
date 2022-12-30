import React, { useState } from "react";
import { Progress } from "antd";
import { FetchContentVisit, fetchSubtitle } from "../../../network";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./ProgressBar.css";
import Certificate from "../../Course/Certificate/Certificate";
import { Spinner } from "react-bootstrap";
function ProgressBar(props) {
  const [done, setDone] = useState(false);
  const {
    subContents,
    subtitles,
    vc,
    setVc,
    courseId,
    setLoading,
    courseName,
    percentage,
    setPercentage,
  } = props;

  const handleProgressPercentage = async () => {
    let totalPercentage = 0;
    let noOfFalse = 0;
    let noOftrue = 0;

    for (let subs = 0; subs < subtitles.length; subs++) {
      const sub = await fetchSubtitle(subtitles[subs]);

      if (sub === null) continue;
      let subContentArr = sub.subTitle_Content;
      noOfFalse += subContentArr.length;
      for (let con = 0; con < subContentArr.length; con++) {
        const content = await FetchContentVisit(
          subContentArr[con].subTitle_Content_id,
          subContentArr[con].type
        );
        if (content) noOftrue++;
      }
    }

    noOfFalse = noOfFalse === 0 ? 1 : noOfFalse;
    totalPercentage = noOftrue / noOfFalse;

    setPercentage((totalPercentage * 100).toFixed(1) ?? 0);
    if (subtitles.length !== 0) setDone(true);
  };

  useEffect(() => {
    setLoading(true);
  }, [done]);

  useEffect(() => {
    handleProgressPercentage();
  }, [subtitles]);

  return (
    <div id="progressWrapper">
      <div style={{ width: "35%", marginRight: 0 }}>
        {done ? (
          <CircularProgressbar
            value={percentage}
            text={`Progress: \n${percentage}%`}
            styles={buildStyles({
              strokeLinecap: "butt",
              textSize: "11px",
              pathTransitionDuration: 0.5,
              pathColor: "#100F0F",
              textColor: "rgba(255, 255, 255, 0.7)",
              trailColor: "#fff",
              backgroundColor: "#fffff",
            })}
          />
        ) : (
          <div style={{ width: "45%", marginRight: 0 }}>
            <ReactLoading type={"spin"} color="#fff" />
          </div>
        )}
      </div>
      {done && percentage == 100 ? (
        <Certificate percentage={percentage} courseName={courseName} />
      ) : null}
    </div>
  );
}

export default ProgressBar;
