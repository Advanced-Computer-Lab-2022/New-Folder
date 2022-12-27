const Subtitle = require("../../models/Subtitle.model");
const Content = require("../../models/Content.model");
const constants = require("../../constants.json");

const coursePrice = async (course) => {
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
  let allContent = [];
  course?.subtitles?.forEach(async (sub) => {
    let subtitle = await Subtitle.findById(sub);
    allContent = allContent.concat(
      subtitle?.subTitle_Content?.filter(
        (content) => content.type === constants.content
      )
    );
  });
  let totalDurationInSeconds =
    allContent?.reduce(async (total, c) => {
      let content = await Content.findById(c.subTitle_Content_id);
      return total + content.duration;
    }, 0) ?? 0;

  const hrs = Math.floor(totalDurationInSeconds / 3600);
  totalDurationInSeconds -= hrs * 3600;
  const mins = Math.floor(totalDurationInSeconds / 60);
  totalDurationInSeconds -= mins * 60;
  const secs = totalDurationInSeconds;
  return { hrs, mins, secs };
};

module.exports = { coursePrice, courseDuration };
