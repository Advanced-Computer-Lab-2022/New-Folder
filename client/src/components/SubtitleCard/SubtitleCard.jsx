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
import "./SubtitleCard.css";
import SuccessFeedback from "../SuccessFeedback/SuccessFeedback";
import ErrorFeedback from "../ErrorFeedback/ErrorFeedback";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Alert, AlertIcon } from "@chakra-ui/alert";

function SubtitleCard(props) {
  const navigate = useNavigate();
  const [subtitle, setSubtitle] = useState({ subTitle_Content: [] });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteFail, setDeleteFail] = useState(false);
  const getSubtitle = async () => {
    try {
      const fetchedSubtitle = await fetchSubtitle(props.subtitleId);
      setSubtitle(fetchedSubtitle);
    } catch (err) {
      console.log(err);
    }
  };
  let timeoutId;
  useEffect(() => {
    if (deleteFail || deleteSuccess) {
      timeoutId = setTimeout(closeConfirmation, 3000);
    }
  }, [deleteSuccess, deleteFail]);
  const deleteSubtitle = async () => {
    setDeleteLoading(true);
    try {
      const updatedSubtitles = [...props.subtitles];
      updatedSubtitles.splice(props.index, 1);
      console.log(updatedSubtitles);
      const updatedCourse = await updateCourse(props.courseId, {
        subtitles: updatedSubtitles,
      });
      console.log(updatedCourse);
      props.setCourse(updatedCourse);
      setDeleteSuccess(true);
    } catch (err) {
      setDeleteFail(true);
    }
    setDeleteLoading(false);
  };
  const closeConfirmation = () => {
    clearTimeout(timeoutId);
    if (deleteSuccess) {
      const updatedSubtitles = [...props.subtitles];
      updatedSubtitles.splice(props.index, 1);
      props.setSubtitles(updatedSubtitles);
    }
    setDeleteSuccess(false);
    setDeleteFail(false);
    setShowDeleteConfirmation(false);
  };
  useEffect(() => {
    getSubtitle();
  }, []);

  return (
    <>
      <Modal centered show={showDeleteConfirmation} onHide={closeConfirmation}>
        {deleteSuccess ? (
          <SuccessFeedback
            msg={`Subtitle "${subtitle.title}" deleted successfully!`}
          />
        ) : (
          <>
            {deleteFail ? (
              <ErrorFeedback />
            ) : (
              <div id="confirmationContainer">
                <h3 className="blackTxt" id="confirmationHeader">
                  {`Are you sure you want to delete subtitle "${subtitle.title}"?`}
                </h3>
                <div id="warningSign">
                  <Alert status="warning">
                    <AlertIcon boxSize="80px" />
                  </Alert>
                </div>
                <div style={{ width: "100%" }}>
                  <Button
                    className="greyBgHover"
                    id="cancelConfirmationButton"
                    onClick={closeConfirmation}
                    disabled={deleteLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="redBgHover"
                    id="confirmationButton"
                    onClick={deleteSubtitle}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        {" Deleting..."}
                      </>
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Modal>
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
                    onClick={() => setShowDeleteConfirmation(true)}
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
