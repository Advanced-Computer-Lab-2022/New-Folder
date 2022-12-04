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
import { updateCourse, createNewSubtitle } from "../../network";
import Form from "react-bootstrap/Form";
import CourseSummary from "../../components/CourseSummary/CourseSummary";
import Accordion from "react-bootstrap/Accordion";
import CourseReviewCard from "../../components/Course/CourseReviewCard/CourseReviewCard";

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
  const [newSubtitle, setNewSubtitle] = useState("");
  const [promotion, setPromotion] = useState(null);
  let ReviewCards = useMemo(() => {
    return () => <CourseReviewCard reviews={reviews} />;
  }, [reviews]);
  const uploadIntroVideo = async () => {
    try {
      const newCourse = await updateCourse(course._id, {
        introVideo: newVideo,
      });
      setCourse(newCourse);
      setNewVideo("");
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCourse = async () => {
    try {
      const fetchedCourse = await fetchCourseDetails(courseId);
      const fetchedVc = getViewerContext(fetchedCourse);
      console.log(fetchedVc);
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
      setReviews(fetchedReviews);
      setSubtitles(fetchedCourse.subtitles);
      setPromotion(fetchedCourse.promotion);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPrice = async () => {
    try {
      const fetchedPrice = await getPrice(course.price);
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

  const addSubtitle = async (e) => {
    e.preventDefault();
    try {
      const updatedCourse = await createNewSubtitle(course._id, newSubtitle);
      setCourse(updatedCourse);
      setSubtitles(updatedCourse.subtitles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    fetchPrice();
  }, [ReactSession.get("country"), course]);
  useEffect(() => {
    claculateDuration();
  }, [durationMap, course]);
  return (
    <div>
      <CourseSummary
        course={course}
        vc={vc}
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
                vc={vc}
              />
            ))}
          </div>
          {vc === ViewerContexts.author ? (
            <Form onSubmit={addSubtitle}>
              <Container className="mt-4">
                <Form.Group className="mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Add Subtitle"
                    value={newSubtitle}
                    required
                    onChange={(e) => {
                      setNewSubtitle(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <div className="text-center">
                  <Button className="mt-3" type="submit">
                    Add Subtitle
                  </Button>
                </div>
              </Container>
            </Form>
          ) : null}
        </Accordion>
      </div>
      <ReviewCards />
    </div>
  );
};
export default CourseDetails;
