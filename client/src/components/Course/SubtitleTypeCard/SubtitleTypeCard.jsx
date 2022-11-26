import React, { useState } from 'react'
import { fetchVideoContent } from '../../../network';
import './SubtitleTypeCard.css'
import constants from '../../../constants/SubtitlesTypes.json'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubtitleTypeCard = (props) => {
  const navigate = useNavigate();
  const courseID = props.cid;
  const subIDx = props.sidx;
  const contentIDx = props.contentIdx;

  const contentType = props.contentType;
  const contentID = props.contentID;
  
  const [type,setType] = useState("");
  const [duration , setDuration] = useState("");
  const [description , setDescription] = useState("");
  
  const fetchingContent = async ()=> {
    setType(contentType);
    if (contentType == constants.content) {
      const fetchedContent = await fetchVideoContent(contentID);
      setDescription(fetchedContent.description);
      setDuration(fetchedContent.duration);
    }
  }

  useEffect(()=> {
    fetchingContent();
  }, []);

  return (

    <div className="Content-card" onClick={(e)=> {type ==  constants.content ? navigate("/watch/"+courseID + "?sId=" +subIDx + "&cId=" + contentIDx) : navigate("/") }}>
        <i class={type === constants.content ? "bi bi-play-circle" : "bi-card-checklist"}></i>
        <span> {type === constants.content ? "Content : " +description  : "Excercise "}   </span>
        
        {type === constants.content &&
            <div class="content-duration"> 
                <i class="bi bi-clock-fill"></i> 
                <span>{duration} min</span> 
            </div>}
        
    </div>
  )
}

export default SubtitleTypeCard;