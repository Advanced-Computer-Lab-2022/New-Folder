import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { getPrice, fetchCourseDetails } from "../../network";
import SubtitleCard from "../../components/SubtitleCard/SubtitleCard";
import { getViewerContext } from "../../utils/viewerContext";
import "./CourseDetails.css";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import ViewerContexts from "../../constants/ViewerContexts.json";
import { updateCourse } from "../../network";
import CourseSummary from "../../components/CourseSummary/CourseSummary";
import Accordion from "react-bootstrap/Accordion";
import CourseReviewCard from "../../components/Course/CourseReviewCard/CourseReviewCard";
import colors from "../../colors.json";
import { Spinner } from "react-bootstrap";
import AddSubtitle from "../../components/Course/AddSubtitle/AddSubtitle";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [price, setPrice] = useState("");
  const [vc, setVc] = useState("");
  const [durationMap, setDurationMap] = useState(new Map());
  const [duration, setDuration] = useState(0);
  const [newVideo, setNewVideo] = useState();
  const [promotion, setPromotion] = useState(null);
  const [subContents, setSubContents] = useState([]);
  const [allPageLoading, setAllPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  let ReviewCards = useMemo(() => {
    return () => <CourseReviewCard reviews={reviews} />;
  }, [reviews]);

  const includeInGlobalSubContentArr = (arr) => {
    if (arr !== []) {
      let newArr = [...subContents];
      newArr.push(arr);
      setSubContents(newArr);
    }
  };

  const uploadIntroVideo = async () => {
    const newCourse = await updateCourse(course._id, {
      introVideo: newVideo,
    });
    setCourse(newCourse);
    setNewVideo("");
  };
  const fetchCourse = async () => {
    try {
      setAllPageLoading(true);
      const fetchedCourse = await fetchCourseDetails(courseId);
      const fetchedVc = getViewerContext(fetchedCourse);
      setVc(fetchedVc);
      setCourse(fetchedCourse);
      let fetchedReviews = [];
      for (let i = 0; i < fetchedCourse.ratings.length; i++) {
        if (
          fetchedCourse.ratings[i].review &&
          fetchedCourse.ratings[i].review !== ""
        ) {
          fetchedReviews.push({
            traineeId: fetchedCourse.ratings[i].traineeId,
            traineeName: fetchedCourse.ratings[i].traineeName,
            review: fetchedCourse.ratings[i].review,
            rating: fetchedCourse.ratings[i].rating,
          });
        }
      }
      await fetchPrice(fetchedCourse);
      setDuration(fetchedCourse.duration);
      setReviews(fetchedReviews);
      setSubtitles(fetchedCourse.subtitles);
      setPromotion(fetchedCourse.promotion);
      setAllPageLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPrice = async (course) => {
    try {
      const fetchedPrice = await getPrice({
        magnitude: course.priceBeforePromotion,
        currency: course.price.currency,
      });
      setPrice(fetchedPrice);
    } catch (err) {
      console.log(err);
    }
  };
  const claculateDuration = () => {
    if (durationMap.size > 0) {
      let d = 0;
      for (let [key, value] of durationMap) {
        if (!isNaN(value)) {
          d = parseInt(d) + parseInt(value ?? 0);
        }
      }
      setDuration(d);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    fetchPrice(course);
  }, [ReactSession.get("country"), course]);

  return (
    <>
      {allPageLoading ? (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "20%" }}
        >
          <Spinner
            animation="border"
            className="text-center"
            style={{
              width: "5rem",
              height: "5rem",
              color: colors.black,
            }}
          />
        </div>
      ) : (
        <div className="courseDetails">
          <div style={{ display: loading ? "initial" : "none" }}>
            <CourseSummary
              course={course}
              vc={vc}
              setVc={setVc}
              price={price}
              courseId={courseId}
              duration={duration}
              newVideo={newVideo}
              setNewVideo={setNewVideo}
              uploadIntroVideo={uploadIntroVideo}
              promotion={promotion}
              setPromotion={setPromotion}
              reviews={reviews}
              setReviews={setReviews}
              subtitles={subtitles}
              setSubContents={setSubContents}
              subContents={subContents}
              setLoading={setLoading}
            />
            <div>
              <Accordion>
                <div id="subtitlesWrapper">
                  <h3 className="mb-4">Subtitles ({subtitles.length})</h3>
                  {subtitles.map((subtitleId, index) => (
                    <SubtitleCard
                      setCourse={setCourse}
                      subtitles={subtitles}
                      setSubtitles={setSubtitles}
                      claculateDuration={claculateDuration}
                      courseId={course._id}
                      index={index}
                      subtitleId={subtitleId}
                      durationMap={durationMap}
                      setDurationMap={setDurationMap}
                      setSubContents={setSubContents}
                      subContents={subContents}
                      handleSubContent={(arr) =>
                        includeInGlobalSubContentArr(arr)
                      }
                      vc={vc}
                    />
                  ))}
                </div>
              </Accordion>
            </div>
            {vc === ViewerContexts.author ? (
              <AddSubtitle
                course={course}
                setCourse={setCourse}
                setSubtitles={setSubtitles}
              />
            ) : null}
            <ReviewCards />
          </div>
        </div>
      )}
    </>
  );
};
export default CourseDetails;
