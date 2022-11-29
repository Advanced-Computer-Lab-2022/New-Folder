import { getPrice } from "../network";

export const filterCoursesByPrice = async (min, max, courses) => {
  let coursesPrices = await Promise.all(
    courses.map((course) => getPrice(course.price))
  );
  console.log(coursesPrices);
  coursesPrices = coursesPrices.map((course) =>
    parseFloat(course.split(" ")[0])
  );
  return courses.filter(
    (course, index) =>
      coursesPrices[index] >= min && coursesPrices[index] <= max
  );
};

export const filterCoursesByRating = (value, courses) => {
  return courses.filter((course) => course.rating == value);
};

export const filterCoursesBySubject = (value, courses) => {
  return courses.filter((course) => hasSubString(course.subject ?? "", value));
};

const hasSubString = (string, substring) => {
  const regularExpression = new RegExp(substring, "gi");
  return (string.match(regularExpression) || []).length !== 0;
};
