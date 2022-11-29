import React from "react";
import { useState, useEffect } from "react";
import { fetchSubtitle, updateCourse } from "../../network";
import VideoPreview from "./VideoPreview";
import Accordion from "react-bootstrap/Accordion";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import ViewerContexts from "../../constants/ViewerContexts.json";
import Button from "react-bootstrap/Button";

function SubtitleCard(props) {
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
    try{
      const updatedSubtitles = [...props.subtitles];
      updatedSubtitles.splice(props.index, 1);
      console.log(updatedSubtitles);
      const updatedCourse = await updateCourse(props.courseId, {subtitles: updatedSubtitles});
      console.log(updatedCourse);
      props.setSubtitles(updatedCourse.subtitles);
    }catch (err){
      console.log(err);
    }
  }

  useEffect(() => {
    getSubtitle();
  }, []);

  return (
    <>
      <Accordion.Item eventKey={props.index}>
        <Accordion.Header>
          {"section " + subtitle.subtitleNumber + ": "}
        </Accordion.Header>
        <Accordion.Body>
          {props.vc === ViewerContexts.author ? <Button>edit</Button> : null}
          {props.vc === ViewerContexts.author ? <Button variant="danger" onClick={deleteSubtitle}>delete</Button> : null}
          <p>{"Title: " + (subtitle.title ?? "")}</p>
          <ol style={{ border: "1px dotted black" }}>
            {subtitle.subTitle_Content.map((content, index) => {
              return (
                <li>
                  <div>
                    {content.type == "content" ? (
                      <div>
                        <MdOutlineOndemandVideo gap={3} />
                        video
                        <VideoPreview
                          videoId={content.subTitle_Content_id}
                          idx={index}
                          durationMap={props.durationMap}
                          setDurationMap={props.setDurationMap}
                        />
                      </div>
                    ) : (
                      <div>
                        <GiNotebook />
                        Exercise
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}

export default SubtitleCard;
