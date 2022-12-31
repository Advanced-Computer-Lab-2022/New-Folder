import React, { useState } from "react";
import { FetchContentVisit, fetchSubtitle } from "../../../network";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import "./ProgressBar.css";
import Certificate from "../../Course/Certificate/Certificate";
import { Spinner, ProgressBar } from "react-bootstrap";
function Progress(props) {
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
    <span id="progressWrapper">
      <div>
        {done ? (
          <div>
            <h4 className="mb-3">Your progress : </h4>
            <ProgressBar
              variant="dark"
              striped
              now={percentage}
              label={`${Math.round(percentage)}%`}
            />
          </div>
        ) : (
          <div style={{ width: "45%", marginRight: 20 }}>
            <ReactLoading type={"spin"} color="#fff" />
          </div>
        )}
      </div>
      {done && percentage == 100 ? (
        <Certificate percentage={percentage} courseName={courseName} />
      ) : null}
    </span>
  );
}

export default Progress;
