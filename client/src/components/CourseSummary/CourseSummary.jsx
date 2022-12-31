import React, { useEffect, useMemo } from "react";
import ViewerContexts from "../../constants/ViewerContexts.json";
import userTypes from "../../constants/UserTypes.json";
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
import { Button, Card, Modal, Overlay, Tooltip } from "react-bootstrap";
import "../../App.css";
import PublishCourse from "../Course/PublishCourse/PublishCourse";
import { useRef } from "react";
import RefundForm from "../Course/Refund/RefundForm";
import { GiReceiveMoney } from "react-icons/gi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { useNavigate } from "react-router-dom";
function CourseSummary(props) {
  const {
    course,
    vc,
    setVc,
    price,
    courseId,
    duration,
    newVideo,
    setNewVideo,
    uploadIntroVideo,
    promotion,
    setPromotion,
    reviews,
    setReviews,
    subtitles,
    setSubContents,
    subContents,
    setLoading,
    totalRating,
    setTotalRating,
    ratingsCount,
    setRatingsCount,
  } = props;
  const [validPromotion, setValidPromotion] = useState(false);
  const [loadingEnrollBtn, setLoadingEnrollBtn] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [paymentConfirmationMsg, setPaymentConfirmationMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPopOver, setShowPopOver] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    setTotalRating(course.totalRating);
  }, []);

  useEffect(() => {
    if (vc !== "")
      if (
        !(
          vc === ViewerContexts.enrolledTrainee ||
          vc === ViewerContexts.refundingTrainee
        )
      ) {
        setLoading(true);
      }
  }, [vc]);

  useEffect(() => {
    const startDate = new Date(promotion?.startDate).getTime();
    const endDate = new Date(promotion?.endDate).getTime();
    const now = Date.now();
    if (now <= endDate && now >= startDate && promotion?.percentage > 0) {
      setValidPromotion(true);
    } else {
      setValidPromotion(false);
    }
  }, [promotion]);

  const enroll = async () => {
    if (ReactSession.get("userType") !== userTypes.trainee) {
      setShowLoginModal(true);
      return;
    }
    setLoadingEnrollBtn(true);
    try {
      const currency =
        countryCurrency.country_currency[ReactSession.get("country")];
      const payment = await getPayment({
        courseID: course._id,
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
      <Modal
        centered
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      >
        <div style={{ padding: 5, textAlign: "center" }}>
          <h3 className="blackTxt">
            You need to log in as a trainee to enroll for this course.
          </h3>

          <div
            style={{
              width: "100%",
              marginTop: "3%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              className="greyBgHover"
              style={{ width: "30%" }}
              onClick={() => setShowLoginModal(false)}
            >
              Close
            </Button>
            <Button
              className="blueBgHover"
              style={{ width: "30%" }}
              onClick={() => navigate("/login")}
            >
              Join us!
            </Button>
          </div>
        </div>
      </Modal>
      <div id="courseSummaryContainer" className="blueBg">
        <div id="leftCol">
          <IntroVideo
            introVideo={course.introVideo}
            vc={vc}
            newVideo={newVideo}
            setNewVideo={setNewVideo}
            uploadIntroVideo={uploadIntroVideo}
          />
          {vc === ViewerContexts.author ? (
            <EditPreviewVideo
              newVideo={newVideo}
              setNewVideo={setNewVideo}
              uploadIntroVideo={uploadIntroVideo}
            />
          ) : null}
          <PublishCourse courseId={course._id} vc={vc} setVc={setVc} />
          <EnrollGoToCourse
            vc={vc}
            enroll={enroll}
            loadingEnrollBtn={loadingEnrollBtn}
            courseId={courseId}
            course={course}
            setVc={setVc}
          />
          {![
            ViewerContexts.admin,
            ViewerContexts.guest,
            ViewerContexts.nonEnrolledCorporateTrainee,
            ViewerContexts.pendingCorporateTrainee,
          ].includes(vc) ? (
            <>
              {" "}
              <small
                ref={target}
                style={{
                  width: "fit-content",
                  marginLeft: 0,
                  marginBottom: -20,
                }}
              >
                Help&nbsp;
                <AiOutlineQuestionCircle
                  onClick={() => setShowPopOver(!showPopOver)}
                  style={{ cursor: "pointer", marginBottom: "0%" }}
                />
              </small>
              <Overlay
                target={target.current}
                show={showPopOver}
                placement="right"
              >
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    {vc !== ViewerContexts.guest &&
                    vc !== ViewerContexts.nonEnrolledCorporateTrainee ? (
                      <ReportCourse
                        course={course}
                        setShowPopOver={setShowPopOver}
                        showPopOver={showPopOver}
                      />
                    ) : null}
                    {(vc === ViewerContexts.enrolledTrainee &&
                      ReactSession.get("userType") !==
                        userTypes.corporateTrainee &&
                      progress < 50) ||
                    vc === ViewerContexts.refundingTrainee ? (
                      <RefundForm
                        vc={vc}
                        setVc={setVc}
                        courseId={courseId}
                        setShowPopOver={setShowPopOver}
                        showPopOver={showPopOver}
                      />
                    ) : null}
                  </Tooltip>
                )}
              </Overlay>
            </>
          ) : null}
        </div>
        <div id="rightCol">
          <CourseHeader
            totalRating={totalRating}
            name={course.name}
            vc={vc}
            instructorId={course.instructorInfo?.instructorId}
            instructorName={course.instructorInfo?.instructorName}
            ratingsCount={ratingsCount}
            subContents={subContents}
            subtitles={subtitles}
            percentage={progress}
            setPercentage={setProgress}
            setVc={setVc}
            courseId={course._id}
            setLoading={setLoading}
            courseName={course.name}
            setTotalRating={setTotalRating}
            setRatingsCount={setRatingsCount}
            reviews={reviews}
            setReviews={setReviews}
            promotion={promotion}
            setPromotion={setPromotion}
          />

          <CourseBody
            vc={vc}
            validPromotion={validPromotion}
            price={price}
            percentage={promotion?.percentage}
            totalDuration={duration}
            subject={course.subject}
            summary={course.description}
            trainees={course.trainees}
            ratingsCount={ratingsCount}
            totalRating={totalRating}
          />
        </div>
      </div>

      <PaymentConfirmation
        show={showPaymentConfirmation}
        setShow={setShowPaymentConfirmation}
        msg={paymentConfirmationMsg}
        courseId={course._id}
      />
      <ErrorModal show={showError} handleClose={() => setShowError(false)} />
    </>
  );
}

export default CourseSummary;
