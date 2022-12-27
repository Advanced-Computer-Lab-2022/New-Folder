const Subtitle = require("../../models/Subtitle.model");
const Content = require("../../models/Content.model");
const constants = require("../../constants.json");

const coursePrice = (course) => {
  let discount = course.promotion;
  let finalPrice = parseFloat(course.price.magnitude);
  let hasPromotion = false;
  if (discount) {
    let now = Date.now();
    if (discount.startDate <= now && discount.endDate > now) {
      finalPrice *= 1 - discount.percentage / 100;
      hasPromotion = true;
    }
  }
  return {
    hasPromotion,
    discount: discount?.percentage,
    priceBeforePromotion: course.price.magnitude,
    finalPrice,
    currency: course.price.currency,
  };
};

const courseDuration = async (course) => {
  let subtitles = await Promise.all(
    course?.subtitles?.map((sub) => Subtitle.findById(sub))
  );
  let allContent = [];
  subtitles?.forEach((item) => {
    allContent = allContent.concat(
      item.subTitle_Content?.filter(
        (content) => content.type === constants.content
      )
    );
  });

  allContent = await Promise.all(
    allContent.map((c) => Content.findById(c.subTitle_Content_id))
  );

  let totalDurationInSeconds =
    allContent?.reduce((total, c) => total + c.duration, 0) ?? 0;

  // const hrs = Math.floor(totalDurationInSeconds / 3600);
  // totalDurationInSeconds -= hrs * 3600;
  // const mins = Math.floor(totalDurationInSeconds / 60);
  // totalDurationInSeconds -= mins * 60;
  // const secs = totalDurationInSeconds;

  // let duration = "";
  // if (hrs > 0) {
  //   duration = `${hrs}:${mins > 9 ? mins : "0" + mins}:${
  //     secs > 9 ? secs : "0" + secs
  //   }`;
  // } else if (mins > 0) {
  //   duration = `${mins}:${secs > 9 ? secs : "0" + secs}`;
  // } else {
  //   duration = secs;
  // }

  let duration = Math.round(totalDurationInSeconds / 3600);
  duration += duration === 1 ? " hour" : " hours";
  return duration;
};

module.exports = { coursePrice, courseDuration };
