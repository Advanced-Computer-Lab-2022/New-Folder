import { getPrice } from "../network";

export const filterCoursesByPrice = async (min, max, courses) => {
  if (min === "") min = 0;
  if (max === "") max = Infinity;
  let coursesPrices = await Promise.all(
    courses.map((course) =>
      getPrice({
        magnitude: course.price.finalPrice,
        currency: course.price.currency,
      })
    )
  );
  coursesPrices = coursesPrices.map((course) =>
    parseFloat(course.split(" ")[0])
  );
  return courses.filter(
    (course, index) =>
      coursesPrices[index] >= min && coursesPrices[index] <= max
  );
};

export const filterCoursesByRating = (value, courses) => {
  return courses.filter(
    (course) =>
      parseFloat(course.totalRating).toFixed(1) == parseFloat(value).toFixed(1)
  );
};

export const filterCoursesBySubject = (value, courses) => {
  return courses.filter((course) => hasSubString(course.subject ?? "", value));
};

const hasSubString = (string, substring) => {
  const regularExpression = new RegExp(substring, "gi");
  return (string.match(regularExpression) || []).length !== 0;
};
