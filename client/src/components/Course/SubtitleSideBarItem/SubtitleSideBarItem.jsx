import React from "react";
import "./SubtitleSideBarItem.css";
import { useState } from "react";
import SubtitleTypeCard from "../SubtitleTypeCard/SubtitleTypeCard";
import { fetchSubtitle } from "../../../network";
import { useEffect } from "react";

const SubtitleSideBarItem = (props) => {
  const subtitleID = props.subtitleContent;
  const courseID = props.cid;
  const subIDx = props.sidx;
  const opened = props.opened;
  const isOpenedSubtitle = props.isOpenedSubtitle;
  // const [open, setOpen] = useState(false);
  const [subtitleContent, setSubtitleContent] = useState([]);
  const [subtitleNumber, setSubtitleNumber] = useState("");
  const  [subtitleTitlem, setSubtitleTitle] = useState("");

  const fetchingSubtitle = async () => {
    const fetchedSubtitle = await fetchSubtitle(subtitleID);
    setSubtitleNumber(fetchedSubtitle.subtitleNumber);
    setSubtitleContent(fetchedSubtitle.subTitle_Content);
    setSubtitleTitle(fetchedSubtitle.title);
  };

  useEffect(() => {
    fetchingSubtitle();
  }, []);

  return (
    <div
      className={
        isOpenedSubtitle[subIDx] ? "sidebar-item open" : "sidebar-item"
      }
    >
      <div
        className="sidebar-title"
        onClick={() => {
          opened(subIDx);
        }}
      >
        <i class="bi bi-chevron-compact-down toggle-btn"></i>
        <span>{subtitleTitlem}</span>
      </div>
      <div className="sidebar-content">
        {/* from each subtitle get the array of subTitle_Content and insert each content and Excercise */}
        {subtitleContent.map((subtitleContent, index) => {
          return (
            <SubtitleTypeCard
              subtitleID={subtitleID}
              contentID={subtitleContent.subTitle_Content_id}
              contentType={subtitleContent.type}
              cid={courseID}
              sidx={subIDx}
              contentIdx={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SubtitleSideBarItem;
