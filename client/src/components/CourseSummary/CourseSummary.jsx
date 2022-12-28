import React, { useEffect, useMemo } from "react";
import ViewerContexts from "../../constants/ViewerContexts.json";
import "./CourseSummary.css";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import ReportCourse from "../Course/ReportCourse/ReportCourse";
import { ReactSession } from "react-client-session";
import countryCurrency from "../../constants/CountryCurrency.json";
import { getPayment, publishCourse } from "../../network";
import PaymentConfirmation from "../PaymentConfirmation/PaymentConfirmation";
import ErrorModal from "../ErrorModal/ErrorModal";
import IntroVideo from "../Course/IntroVideo/IntroVideo";
import CourseHeader from "../Course/CourseHeader/CourseHeader";
import CourseBody from "../Course/CourseBody/CourseBody";
import EnrollGoToCourse from "../Course/EnrollGoToCourse/EnrollGoToCourse";
import EditPreviewVideo from "../Course/EditPreviewVideo/EditPreviewVideo";
import { Button } from "react-bootstrap";
import "../../App.css";
import PublishCourse from "../Course/PublishCourse/PublishCourse";
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
        <div id="leftCol">
          <IntroVideo
            introVideo={props.course.introVideo}
            vc={props.vc}
            newVideo={props.newVideo}
            setNewVideo={props.setNewVideo}
            uploadIntroVideo={props.uploadIntroVideo}
          />
          {props.vc === ViewerContexts.author ? (
            <EditPreviewVideo
              newVideo={props.newVideo}
              setNewVideo={props.setNewVideo}
              uploadIntroVideo={props.uploadIntroVideo}
            />
          ) : null}
          <PublishCourse
            courseId={props.course._id}
            vc={props.vc}
            setVc={props.setVc}
          />
          <EnrollGoToCourse
            vc={props.vc}
            enroll={enroll}
            loadingEnrollBtn={loadingEnrollBtn}
            courseId={props.courseId}
            course={props.course}
            setVc={props.setVc}
          />

          {props.vc !== ViewerContexts.guest &&
          props.vc !== ViewerContexts.nonEnrolledCorporateTrainee ? (
            <ReportCourse course={props.course} />
          ) : null}
        </div>
        <div id="rightCol">
          <CourseHeader
            totalRating={totalRating}
            name={props.course.name}
            vc={props.vc}
            instructorId={props.course.instructorInfo?.instructorId}
            instructorName={props.course.instructorInfo?.instructorName}
            ratingsCount={ratingsCount}
            subContents={subContents}
            subtitles={props.subtitles}
            percentage={progress}
            setPercentage={setProgress}
            setVc={props.setVc}
            courseId={props.course._id}
            setLoading={setLoading}
            courseName={props.course.name}
            setTotalRating={setTotalRating}
            setRatingsCount={setRatingsCount}
            reviews={props.reviews}
            setReviews={props.setReviews}
            promotion={promotion}
            setPromotion={setPromotion}
          />

          <CourseBody
            vc={props.vc}
            validPromotion={validPromotion}
            price={props.price}
            percentage={promotion?.percentage}
            totalDuration={props.duration}
            subject={props.course.subject}
            summary={props.course.description}
            trainees={props.course.trainees}
          />
        </div>
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
