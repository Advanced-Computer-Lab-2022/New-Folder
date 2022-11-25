import React from 'react'
import SubtitleSideBarItem from '../SubtitleSideBarItem/SubtitleSideBarItem'
import './SubtitleSideBar.css'


const SubtitleSideBar = (props) => {
  return (
    <div className='sideBar'>
      {/* array of subtitles of the course and pass each subtitle to SubtitleSideBarItem  */}
        {props.subtitles.map((subtitle)=>(<SubtitleSideBarItem subtitleContent={subtitle}/>))}
    </div>

  )
}

export default SubtitleSideBar