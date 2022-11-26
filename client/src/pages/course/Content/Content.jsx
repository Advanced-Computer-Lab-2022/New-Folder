import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ContentDisplay from '../../../components/Course/ContentDisplay/ContentDisplay';
import SubtitleSideBar from '../../../components/Course/SubtitleSideBar/SubtitleSideBar';
import SubtitleSideBarItem from '../../../components/Course/SubtitleSideBarItem/SubtitleSideBarItem';
import { fetchCourseDetails, fetchSubtitle, fetchVideoContent } from '../../../network';
import { youTubeGetID } from '../../../utils/videoID';
import './Content.css'




const Content = () => {
   // States of subtitle Array , Video will be displayed, and content description
   const [subtitles, setSubtitles] = useState([]);
   const [subtitleID, setSubtitleID] = useState("");
   
 
  // get course ID to get Course Object
  // get index of specific subtitle index (sId) and content that will be displayed (c)
  const { courseId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const indexOfSubtitle = params.get('sId');
  const indexOfContent = params.get('cId');

  useEffect(  () => {
    fetchCourse();
 }, []);
 
  const fetchCourse = async ()=>{
    try {
      const fetchedCourse = await fetchCourseDetails(courseId);
      setSubtitles(fetchedCourse.subtitles);
      setSubtitleID(fetchedCourse.subtitles[indexOfSubtitle]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row>
        {subtitleID != "" && <ContentDisplay subtitleContentDisplay={subtitleID} cID={indexOfContent}/>}
        <Col lg={4}>
            <div className='sideBar'>
              {/* array of subtitles of the course and pass each subtitle to SubtitleSideBarItem  */}
              {subtitles.map((subtitle)=>(<SubtitleSideBarItem subtitleContent={subtitle}/>))}
            </div>
        </Col>
    </Row>
  )

}

export default Content