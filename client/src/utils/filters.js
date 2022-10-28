function filterCoursesByPrice(min, max, courses) {
  return courses.filter(
    (course) => course.price.magnitude >= min && course.price.magnitude <= max
  );
}

function filterCoursesByRating(value, courses) {
  return courses.filter((course) => course.rating == value);
}

function filterCoursesBySubject(value, courses) {
  return courses.filter((course) => hasSubString(course.subject, value));
}

let hasSubString = (string, substring) => {
  let regularExpression = new RegExp(substring, "gi");
  return (string.match(regularExpression) || []).length !== 0;
};

// function binarySearch(attribute, array, comparator, ...value) {
//     const results = [];
//     let start = 0;
//     let end = array.length - 1;
//     while (start <= end) {
//       let mid = (start + end) / 2;
//       let comparison = comparator(array[mid], attribute, ...value);
//       if (comparison === 0) {
//         results.push(array[mid]);
//         start = mid - 1;
//         while (comparator(array[start], attribute, ...value) === 0) {
//           results.push(array[start--]);
//         }
//         end = mid + 1;
//         while (comparator(array[end], attribute, ...value) === 0) {
//           results.push(array[end++]);
//         }
//       } else if (comparison > 0) {
//         end = mid - 1;
//       } else {
//         start = mid + 1;
//       }
//     }
//     return results;
//   }

//   function filterCoursesByExactValue(value, attribute, sortedCourses) {
//     return binarySearch(attribute, sortedCourses, isEqual, value);
//   }
//   function filterCoursesByRange(min, max, attribute, sortedCourses) {
//     return binarySearch(attribute, sortedCourses, inRange, min, max);
//   }
// function isEqual(object, attribute, value) {
//     return object[attribute] - value;
//   }

//   function inRange(object, attribute, min, max) {
//     if (object[attribute] >= min && object[attribute] <= max) {
//       return 0;
//     } else if (object[attribute] > max) {
//       return 1;
//     } else {
//       return -1;
//     }
//   }

module.exports = {
  filterCoursesByPrice: filterCoursesByPrice,
  filterCoursesByRating: filterCoursesByRating,
  filterCoursesBySubject: filterCoursesBySubject,
};
