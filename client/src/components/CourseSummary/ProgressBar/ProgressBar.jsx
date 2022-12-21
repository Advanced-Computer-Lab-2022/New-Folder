import React, { useState } from "react";
import { Progress } from "antd";
import { FetchContentVisit, fetchSubtitle } from "../../../network";
import { useEffect } from "react";
import ReactLoading from "react-loading";

function ProgressBar(props) {
  const [done, setDone] = useState(false);
  const { percentage, setPercentage, subContents, subtitles } = props;

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
    handleProgressPercentage();
  }, [subtitles]);

  return (
    <div>
      {done ? (
        <Progress type="circle" percent={percentage} />
      ) : (
        <ReactLoading type={"spin"} color="#fff" />
      )}
    </div>
  );
}

export default ProgressBar;
