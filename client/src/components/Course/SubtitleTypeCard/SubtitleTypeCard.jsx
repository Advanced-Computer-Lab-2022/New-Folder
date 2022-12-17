import React, { useState } from "react";
import { FetchMark, fetchVideoContent } from "../../../network";
import "./SubtitleTypeCard.css";
import constants from "../../../constants/SubtitlesTypes.json";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubtitleTypeCard = (props) => {
  const navigate = useNavigate();
  const courseID = props.cid;
  const subIDx = props.sidx;
  const contentIDx = props.contentIdx;

  const contentType = props.contentType;
  const contentID = props.contentID;
  const subtitleID = props.subtitleID;

  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [conID, setConID] = useState("");
  const [traineeMark, setTraineeMark] = useState("");
  const [excerciseMark, setExcerciseMark] = useState("");

  const fetchingContent = async () => {
    setType(contentType);
    setConID(contentID);
    if (contentType == constants.content) {
      const fetchedContent = await fetchVideoContent(contentID);
      setDescription(fetchedContent.description);
      setDuration(fetchedContent.duration);
    } else {
      const fetchedMark = await FetchMark(contentID);
      setTraineeMark(fetchedMark.Mark);
      setExcerciseMark(fetchedMark.ExerciseLength);
    }
  };

  useEffect(() => {
    fetchingContent();
  }, []);

  return (
    <div
      className="Content-card"
      onClick={(e) => {
        type == constants.content
          ? navigate(
              "/watch/" + courseID + "?sId=" + subIDx + "&cId=" + contentIDx,
              { replace: true }
            )
          : navigate("/excercise/" + conID);
      }}
    >

      <div className="Content-card-details">
        <i class={type === constants.content ? "bi bi-play-circle" : "bi-card-checklist"}></i>
        <span>{type === constants.content ? "Content : " + description : "Excercise "} </span>

        <div class="content-duration">
          {type === constants.content ? (
            <i class="bi bi-clock-fill"></i>
          ) : (
            <i>Score : </i>
          )}
          {type === constants.content ? (
            <span>{duration} min</span>
          ) : (
            <span>
              {traineeMark === -1 ? "-" : traineeMark} / {excerciseMark}
            </span>
          )}
        </div>
      </div>

      <div className="Content-card-visit">
        <i class="bi bi-dot"></i>
      </div>

    </div>
  );
};


export default SubtitleTypeCard;
