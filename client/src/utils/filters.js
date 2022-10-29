import { getPrice } from "../network";

export const filterCoursesByPrice = async (min, max, courses) => {
  const coursesPrices = await Promise.all(
    courses.map(async (course) => {
      const result = await getPrice(course.price);
      return result.split(" ");
    })
  );
  console.log(coursesPrices);
  return courses.filter(
    (course, index) =>
      coursesPrices[index][0] >= min && coursesPrices[index][0] <= max
  );
};

export const filterCoursesByRating = (value, courses) => {
  return courses.filter((course) => course.rating == value);
};

export const filterCoursesBySubject = (value, courses) => {
  return courses.filter((course) => hasSubString(course.subject, value));
};

const hasSubString = (string, substring) => {
  const regularExpression = new RegExp(substring, "gi");
  return (string.match(regularExpression) || []).length !== 0;
};
