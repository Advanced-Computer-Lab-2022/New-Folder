import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { fetchVideoContent } from '../../../../network';
import { youTubeGetID } from '../../../../utils/videoID';
import './VideoAndDescription.css'

const VideoAndDescription = (props) => {
    const contentID = props.contentFetched;
    const [video,setVideo] = useState("");
    const [description, setDescription] = useState("");
    

    const fetchingContent = async () => {
        const fetchedContent = await fetchVideoContent(contentID);

        {/* get video id from youtube API and concatenate it to https://www.youtube.com/embed/*/}
        setVideo("https://www.youtube.com/embed/" + youTubeGetID(fetchedContent.video));
        setDescription(fetchedContent.description);
    }

    useEffect(()=>{
        fetchingContent();
    }, []);
        
    return (
        <Col lg={8}>
        <div className="watchScreen__player"> 
          
        <iframe src={video} frameborder="0" title='My Video' allowFullScreen width="100%" height="100%"></iframe>
        </div>
        <div class="watchScreen__description">
        <i class="bi bi-play-circle-fill"></i>
        <span>{description}</span>
        {/* <button type="button" class="btn btn-primary">Next Video</button> */}
        </div>
    </Col> 
  )
}

export default VideoAndDescription