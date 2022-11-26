import React, { useState } from 'react'
import { useEffect } from 'react';
import { fetchSubtitle } from '../../../network';
import VideoAndDescription from './VideoAndDescription/VideoAndDescription';

const ContentDisplay = (props) => {
    const indexOfContent = props.cID;
    const subtitleID = props.subtitleContentDisplay;
    const [contentID,setContentID] = useState("");

    const fetchingSubtitle = async()=>{
        const fetchedSubtitle = await fetchSubtitle(subtitleID);
        setContentID(fetchedSubtitle.subTitle_Content[indexOfContent].subTitle_Content_id);
    }

    useEffect (()=> {
        fetchingSubtitle();
    },[]);



  return (
    <>
        {contentID != "" && <VideoAndDescription contentFetched={contentID}/>}
    </>
    
  )
}

export default ContentDisplay