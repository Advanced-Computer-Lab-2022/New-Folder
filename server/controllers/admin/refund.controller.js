const Instructor = require("../../models/Instructor.model");
const Trainee = require("../../models/Trainee.model");
const Course = require("../../models/Course.model");
const Refund = require("../../models/Refund.model");

const getRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find({});
    res.status(200).send(refunds);
  } catch (err) {
    console.log(err);
  }
};

const approveRefund = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const trainee = await Trainee.findById(userId);
    const course = await Course.findById(courseId);
    let payment = trainee.payments.find(
      (p) => p.courseId.toString() == courseId
    );
    let amounts = payment.amounts;
    let date = payment.date;
    let newPayments = trainee.payments.filter(
      (p) => p.courseId.toString() != courseId
    );
    await Trainee.findByIdAndUpdate(userId, { payments: newPayments });
    await removeEnrollment(userId, courseId);
    await deductFromInstructor(
      course.instructorInfo.instructorId.toString(),
      date,
      course.price.magnitude,
      course.price.currency
    );
    await addToWallet(userId, amounts);
    await deleteRefund(userId, courseId);
    res.status(200).json({ message: "Refunded successfully" });
  } catch (e) {
    res.status(500).json({ error: "Refund failed" });
  }
};

const deductFromInstructor = async (
  instructorId,
  date,
  magnitude,
  currency
) => {
  currency = currency.toLowerCase();
  const instructor = await Instructor.findById(instructorId);
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthPayments = instructor.earnings.find((i) => i.year == year).months[
    month
  ].payments;
  const index = monthPayments.findIndex((p) => p.currency === currency);
  if (monthPayments[index].magnitude === magnitude)
    monthPayments.splice(index, 1);
  else monthPayments[index].magnitude -= magnitude;
  await instructor.save();
};

const addToWallet = async (userId, payments) => {
  const trainee = await Trainee.findById(userId);
  for (let payment of payments) {
    let oldAmount = trainee.wallet.get(payment.currency) ?? 0;
    trainee.wallet.set(payment.currency, oldAmount + payment.magnitude);
    await trainee.save();
  }
};

const removeEnrollment = async (userId, courseId) => {
  const trainee = await Trainee.findById(userId);
  const course = await Course.findById(courseId);
  let newTraineeCourses = trainee.courses.filter(
    (course) => course.toString() != courseId
  );
  await Trainee.findByIdAndUpdate(userId, { courses: newTraineeCourses });
  let newCourseTrainees = course.trainees.filter(
    (trainee) => trainee.toString() != userId
  );
  await Course.findByIdAndUpdate(courseId, { trainees: newCourseTrainees });
};

const deleteRefund = async (userId, courseId) => {
  const refund = await Refund.findOneAndDelete({ userId, courseId });
};

const declineRefund = async (req, res) => {
  const { userId, courseId } = req.body;
  await deleteRefund(userId, courseId);
  res.status(200).json({ message: "Refunded Declined" });
};

module.exports = { approveRefund, getRefunds, declineRefund };
