import React from 'react'
import "./SubtitleSideBarItem.css"
import { useState } from 'react'
import SubtitleTypeCard from '../SubtitleTypeCard/SubtitleTypeCard';


const SubtitleSideBarItem = (props) => {
  const [open , setOpen] = useState(false); 
  return (
    <div className={open ? "sidebar-item open" : "sidebar-item"}  >
      <div className="sidebar-title" onClick ={()=>{setOpen(!open)}}>
        <i class="bi bi-chevron-compact-down toggle-btn"></i>
        <span>
          Section {props.subtitleContent.subtitleNumber}
        </span>
      </div>
      <div className="sidebar-content">
        {/* from each subtitle get the array of subTitle_Content and insert each content and Excercise */}
        { props.subtitleContent.subTitle_Content.map((subtitleContent,exIdx)=> {
        if (subtitleContent.typeOfSubtitle === 'content') exIdx= 0;
        console.log(exIdx);
          return (
            <SubtitleTypeCard content ={subtitleContent} contentIdx={1}/>
          );
        })}

        
      </div>
    </div>
  )
}

export default SubtitleSideBarItem