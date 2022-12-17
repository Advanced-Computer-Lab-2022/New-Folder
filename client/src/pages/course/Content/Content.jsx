import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {  Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Note from "../../../components/Course/AddNote/Note";
import ContentDisplay from "../../../components/Course/ContentDisplay/ContentDisplay";
import SubtitleSideBarItem from "../../../components/Course/SubtitleSideBarItem/SubtitleSideBarItem";
import { fetchCourseDetails } from "../../../network";
import "./Content.css";

const Content = () => {
  // States of subtitle Array , Video will be displayed, and content description
  const [subtitles, setSubtitles] = useState([]);
  const [subtitleID, setSubtitleID] = useState("");
  const [isOpenedSubtitle, setIsOpenedSubtitle] = useState([]);
  const [parentContentID , setParentContentID] = useState(""); 
  const [parentContentTitle , setParentContentTitle] = useState("");

  // get course ID to get Course Object
  // get index of specific subtitle index (sId) and content that will be displayed (cId)
  const { courseId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const indexOfSubtitle = params.get("sId");
  const indexOfContent = params.get("cId");

  // fetch course on page loading
  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const fetchedCourse = await fetchCourseDetails(courseId);
      setSubtitles(fetchedCourse.subtitles);
      setSubtitleID(fetchedCourse.subtitles[indexOfSubtitle]);
      InitializeIsOpenedSubtitle(fetchedCourse.subtitles);
    } catch (err) {
      console.log(err);
    }
  };


  const InitializeIsOpenedSubtitle = (arr) => {
    let ans = [];
    for (let i = 0; i < arr.length; i++) ans.push(false);
    setIsOpenedSubtitle(arr);
  };

  const changeIsOpened = (subIndex) => {
    let arr = [...isOpenedSubtitle];
    let temp = arr[subIndex];
    for (let i = 0; i < arr.length; i++) arr[i] = false;
    arr[subIndex] = !temp;
    console.log(arr);
    setIsOpenedSubtitle(arr);
  };
  // this page will return two kind of components
  // first part which is on the left of the screen includes the required ContentID with required video (ContentDisplay component)
  // second part which is the accordion shows all subtitle_content to let the user choose desired excercise or content Video
  return (
    <Row>
      <Col lg={8} >
        {subtitleID !== "" && (
          <ContentDisplay
            subtitleContentDisplay={subtitleID}
            cID={indexOfContent}
            setParentContentID = {setParentContentID}
            setParentContentTitle={setParentContentTitle}
          />
        )}
        <div className="subtitle-Content-sideBar-parent">
          <div className="subtitle-Content-sideBar">
           {subtitles !== [] && <div className="subtitle-Content-sideBar-header">
              <h3>Sections</h3>
              <p>{subtitles.length} sections</p>
            </div>}
            <div className="sideBar">
              {/* array of subtitles of the course and pass each subtitle to SubtitleSideBarItem  */}
              {subtitles.map((subtitle, index) => (
                <SubtitleSideBarItem
                  subtitleContent={subtitle}
                  cid={courseId}
                  sidx={index}
                  opened={(subIndex) => changeIsOpened(subIndex)}
                  isOpenedSubtitle={isOpenedSubtitle}
                />
              ))}
            </div>
          </div>
        </div>
      </Col>

      {parentContentID !== "" && <Note conID={parentContentID} conTitle={parentContentTitle}/>}

    </Row>
  );
};

export default Content;
