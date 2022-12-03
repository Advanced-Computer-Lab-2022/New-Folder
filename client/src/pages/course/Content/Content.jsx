import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ContentDisplay from '../../../components/Course/ContentDisplay/ContentDisplay';
import SubtitleSideBarItem from '../../../components/Course/SubtitleSideBarItem/SubtitleSideBarItem';
import { fetchCourseDetails } from '../../../network';
import './Content.css'




const Content = () => {
   // States of subtitle Array , Video will be displayed, and content description
   const [subtitles, setSubtitles] = useState([]);
   const [subtitleID, setSubtitleID] = useState("");
   
 
  // get course ID to get Course Object
  // get index of specific subtitle index (sId) and content that will be displayed (cId)
  const { courseId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const indexOfSubtitle = params.get('sId');
  const indexOfContent = params.get('cId');


// fetch course on page loading
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


// this page will return two kind of components
// first part which is on the left of the screen includes the required ContentID with required video (ContentDisplay component)
// second part which is the accordion shows all subtitle_content to let the user choose desired excercise or content Video
  return (
    <Row>
        {subtitleID != "" && <ContentDisplay subtitleContentDisplay={subtitleID} cID={indexOfContent}/>}
        <Col lg={4}>
            <div className='sideBar'>
              {/* array of subtitles of the course and pass each subtitle to SubtitleSideBarItem  */}
              {subtitles.map((subtitle, index)=>(<SubtitleSideBarItem subtitleContent={subtitle} cid={courseId} sidx ={index}/>))}
            </div>
        </Col>
    </Row>
  )

}

export default Content