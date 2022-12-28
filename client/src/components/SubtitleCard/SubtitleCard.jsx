import React from "react";
import { useState, useEffect } from "react";
import { fetchSubtitle, updateCourse } from "../../network";
import { useNavigate } from "react-router-dom";
import VideoPreview from "./VideoPreview";
import Accordion from "react-bootstrap/Accordion";
import { BsFillFileTextFill, BsTrashFill } from "react-icons/bs";
import ViewerContexts from "../../constants/ViewerContexts.json";
import { ImPencil } from "react-icons/im";
import colors from "../../colors.json";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./SubtitleCard.css";
function SubtitleCard(props) {
  const navigate = useNavigate();
  const [subtitle, setSubtitle] = useState({ subTitle_Content: [] });
  const getSubtitle = async () => {
    try {
      const fetchedSubtitle = await fetchSubtitle(props.subtitleId);
      setSubtitle(fetchedSubtitle);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSubtitle = async () => {
    try {
      const updatedSubtitles = [...props.subtitles];
      updatedSubtitles.splice(props.index, 1);
      console.log(updatedSubtitles);
      const updatedCourse = await updateCourse(props.courseId, {
        subtitles: updatedSubtitles,
      });
      console.log(updatedCourse);
      props.setCourse(updatedCourse);
      props.setSubtitles(updatedCourse.subtitles);
      const map = new Map(props.durationMap);
      for (let i = 0; i < subtitle.subTitle_Content.length; i++) {
        map.delete(subtitle.subTitle_Content[i].subTitle_Content_id);
      }
      props.setDurationMap(map);
      props.claculateDuration();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSubtitle();
  }, []);

  return (
    <>
      <Accordion.Item eventKey={props.index}>
        <Accordion.Header>
          <div id="sectionHeader">
            <h4>
              <b>{subtitle.title}</b>
              {props.vc === ViewerContexts.author ? (
                <>
                  <ImPencil
                    color={colors.blue}
                    size={18}
                    style={{ marginBottom: 5, marginLeft: 7 }}
                    onClick={() =>
                      navigate(
                        `/editSubtitle/${props.courseId}/${props.subtitleId}`
                      )
                    }
                  />
                  <BsTrashFill
                    color={colors.red}
                    size={18}
                    style={{ marginBottom: 5, marginLeft: 7 }}
                    onClick={deleteSubtitle}
                  />
                </>
              ) : null}
            </h4>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          {subtitle.subTitle_Content.map((content, index) => {
            return (
              <div>
                {content.type == "content" ? (
                  <VideoPreview
                    videoId={content.subTitle_Content_id}
                    idx={index}
                    durationMap={props.durationMap}
                    setDurationMap={props.setDurationMap}
                  />
                ) : (
                  <h5>
                    <BsFillFileTextFill
                      size={18}
                      style={{ marginBottom: 5, marginRight: 4 }}
                    />
                    Exercise
                  </h5>
                )}
                {index != subtitle.subTitle_Content.length - 1 ? <hr /> : null}
              </div>
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}

export default SubtitleCard;
