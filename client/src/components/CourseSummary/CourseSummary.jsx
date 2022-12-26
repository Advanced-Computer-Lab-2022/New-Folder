import React, { useEffect, useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import RatingCard from "../../components/RatingCard/RatingCard";
import Form from "react-bootstrap/Form";
import ViewerContexts from "../../constants/ViewerContexts.json";
import UserTypes from "../../constants/UserTypes.json";
import Button from "react-bootstrap/Button";
import "./CourseSummary.css";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import AddPromotion from "../Course/AddPromotion/AddPromotion";
import "react-day-picker/dist/style.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import {
  getYoutubeVideoID,
  totalDuration,
} from "../../utils/getVideoDurationUtils";
import ProgressBar from "./ProgressBar/ProgressBar";
import ReportCourse from "../Course/ReportCourse/ReportCourse";
import { ReactSession } from "react-client-session";
import countryCurrency from "../../constants/CountryCurrency.json";
import { getPayment } from "../../network";
import RequestAccess from "../Course/RequestAccess/RequestAccess";
import { Spinner } from "react-bootstrap";
import PaymentConfirmation from "../PaymentConfirmation/PaymentConfirmation";
import ErrorModal from "../ErrorModal/ErrorModal";
import IntroVideo from "../Course/IntroVideo/IntroVideo";
import CourseHeader from "../Course/CourseHeader/CourseHeader";
import CourseBody from "../Course/CourseBody/CourseBody";

function CourseSummary(props) {
  const [totalRating, setTotalRating] = useState(null);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [validPromotion, setValidPromotion] = useState(false);
  const [loadingEnrollBtn, setLoadingEnrollBtn] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [paymentConfirmationMsg, setPaymentConfirmationMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [progress, setProgress] = useState(0);
  const promotion = props.promotion;
  const setPromotion = props.setPromotion;
  const subContents = props.subContents;
  const setLoading = props.setLoading;
  const navigate = useNavigate();

  useEffect(() => {
    setTotalRating(props.course.totalRating);
  }, []);

  useEffect(() => {
    if (props.vc !== "")
      if (
        !(
          props.vc === ViewerContexts.enrolledTrainee ||
          props.vc === ViewerContexts.refundingTrainee
        )
      ) {
        setLoading(true);
      }
  }, [props.vc]);

  useEffect(() => {
    const startDate = new Date(promotion?.startDate).getTime();
    const endDate = new Date(promotion?.endDate).getTime();
    const now = Date.now();
    if (now <= endDate && now >= startDate && promotion?.percentage > 0) {
      setValidPromotion(true);
    } else {
      setValidPromotion(false);
    }
  }, [props.promotion]);

  const enroll = async () => {
    setLoadingEnrollBtn(true);
    try {
      const currency =
        countryCurrency.country_currency[ReactSession.get("country")];
      const payment = await getPayment({
        courseID: props.course._id,
        userCurrency: currency,
      });
      if (payment.wallet <= 0) {
        setPaymentConfirmationMsg(
          `You will be charged ${payment.card.toFixed(
            2
          )} ${currency} from your credit card.`
        );
      } else if (payment.card <= 0) {
        setPaymentConfirmationMsg(
          `You will be charged ${payment.wallet.toFixed(
            2
          )} ${currency} from your wallet.`
        );
      } else {
        setPaymentConfirmationMsg(
          `You will be charged ${payment.wallet.toFixed(
            2
          )} ${currency} from your wallet and ${payment.card.toFixed(
            2
          )} ${currency} from your credit card.`
        );
      }
      setLoadingEnrollBtn(false);
      setShowPaymentConfirmation(true);
    } catch (e) {
      setLoadingEnrollBtn(false);
      setShowError(true);
      console.log(e);
    }
  };

  return (
    <>
      <div id="courseSummaryContainer" className="blueBg">
        <div className="courseSummaryFirstRow-parent">
          <div id="courseSummaryFirstRow">
            <Row className="mb-0">
              <Col>
                <CourseHeader
                  totalRating={totalRating}
                  name={props.course.name}
                  vc={props.vc}
                  instructorId={props.course.instructorInfo?.instructorId}
                  instructorName={props.course.instructorInfo?.instructorName}
                  ratingsCount={ratingsCount}
                />
              </Col>
            </Row>
          </div>
          <div className="course-progress-bar">
            {(props.vc === ViewerContexts.enrolledTrainee ||
              props.vc === ViewerContexts.refundingTrainee) && (
              <ProgressBar
                subContents={subContents}
                subtitles={props.subtitles}
                percentage={progress}
                setPercentage={setProgress}
                vc={props.vc}
                setVc={props.setVc}
                courseId={props.course._id}
                setLoading={setLoading}
                courseName={props.course.name}
              />
            )}
          </div>
        </div>

        <div id="courseSummarySecondRow">
          <Row>
            <Col>
              <Stack gap={3}>
                <div id="priceEnroll">
                  {props.vc === ViewerContexts.guest ? (
                    <>
                      {ReactSession.get("userType") === UserTypes.trainee ? (
                        <Button
                          id="enrollButton"
                          variant="dark"
                          onClick={enroll}
                          disabled={loadingEnrollBtn}
                        >
                          Enroll{" "}
                          {loadingEnrollBtn ? (
                            <Spinner
                              as="span"
                              animation="border"
                              className="ms-1"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : null}
                        </Button>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {props.vc === ViewerContexts.enrolledTrainee ? (
                        <Button
                          id="goToCourse"
                          variant="dark"
                          onClick={() =>
                            navigate(
                              "/watch/" + props.courseId + "?sId=0&cId=0"
                            )
                          }
                        >
                          Go to course
                        </Button>
                      ) : (
                        <>
                          {[
                            ViewerContexts.pendingCorporateTrainee,
                            ViewerContexts.nonEnrolledCorporateTrainee,
                          ].includes(props.vc) ? (
                            <RequestAccess
                              vc={props.vc}
                              setVc={props.setVc}
                              course={props.course}
                            />
                          ) : null}
                        </>
                      )}
                    </>
                  )}
                </div>
                <CourseBody
                  vc={props.vc}
                  validPromotion={validPromotion}
                  price={props.price}
                  percentage={promotion?.percentage}
                  totalDuration={totalDuration(props.duration)}
                  subject={props.course.subject}
                  summary={props.course.description}
                  trainees={props.course.trainees}
                />

                <div id="addRating">
                  <RatingCard
                    courseId={props.courseId}
                    vc={props.vc}
                    totalRating={totalRating}
                    setTotalRating={setTotalRating}
                    ratingsCount={ratingsCount}
                    setRatingsCount={setRatingsCount}
                    reviews={props.reviews}
                    setReviews={props.setReviews}
                  />
                  {props.vc === ViewerContexts.author ||
                  props.vc === ViewerContexts.admin ? (
                    <AddPromotion
                      promotion={promotion}
                      setPromotion={setPromotion}
                      courseId={props.course._id}
                    />
                  ) : null}
                </div>
              </Stack>
            </Col>
            <Col>
              <IntroVideo
                introVideo={props.course.introVideo}
                vc={props.vc}
                newVideo={props.newVideo}
                setNewVideo={props.setNewVideo}
                uploadIntroVideo={props.uploadIntroVideo}
              />
            </Col>
          </Row>
        </div>
        {props.vc !== ViewerContexts.guest &&
        props.vc !== ViewerContexts.nonEnrolledCorporateTrainee ? (
          <ReportCourse course={props.course} />
        ) : null}
      </div>
      <PaymentConfirmation
        show={showPaymentConfirmation}
        setShow={setShowPaymentConfirmation}
        msg={paymentConfirmationMsg}
        courseId={props.course._id}
      />
      <ErrorModal show={showError} handleClose={() => setShowError(false)} />
    </>
  );
}

export default CourseSummary;
