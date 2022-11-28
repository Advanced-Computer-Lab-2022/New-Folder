import React from "react";
import { useState, useEffect } from "react";
import { fetchSubtitle } from "../../network";
import VideoPreview from "./VideoPreview";
import Accordion from "react-bootstrap/Accordion";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
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
