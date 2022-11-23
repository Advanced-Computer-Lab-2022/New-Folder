import React from "react";
import {useState, useEffect} from "react";
import {fetchSubtitle} from "../../network"


function SubtitleCard(props) {
  const [subtitle, setSubtitle] = useState();
  console.log(props.subtitleId);
  const getSubtitle = async () =>{
    try{
      
      const fetchedSubtitle = await fetchSubtitle(props.subtitleId);
      setSubtitle(fetchedSubtitle);
      console.log(fetchedSubtitle); 
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    console.log("useEffect");
    getSubtitle();
  }, [])

  return <div>{subtitle.subtitleNumber}</div>;
}

export default SubtitleCard;
