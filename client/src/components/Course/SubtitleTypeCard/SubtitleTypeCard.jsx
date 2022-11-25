import React, { useState } from 'react'
import './SubtitleTypeCard.css'
const SubtitleTypeCard = (props) => {

  return (
    <div className="Content-card">
        <i class={props.content.typeOfSubtitle === 'content'? "bi bi-play-circle" : "bi-card-checklist"}></i>
        <span> {props.content.typeOfSubtitle === 'content' ? "Content" : "Excercise"} {props.contentIdx} : {props.content.description} </span>
        
        {props.content.typeOfSubtitle === 'content' &&
            <div class="content-duration"> 
                <i class="bi bi-clock-fill"></i> 
                <span>{props.content.duration} min</span> 
            </div>}
        
    </div>
  )
}

export default SubtitleTypeCard;