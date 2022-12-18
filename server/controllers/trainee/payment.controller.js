require("dotenv").config();
const Course = require("../../models/Course.model");
const Trainee = require("../../models/Trainee.model");
const Instructor = require("../../models/Instructor.model");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { currencyConverter } = require("../guest/currencyConverter.controller");
const { payByWallet, getAmountPaidByWallet } = require("./wallet.controller");

const payForCourse = async (req, res) => {
  const { courseID, userCurrency } = req.body;
  const course = await Course.findById(courseID);
  let discount = course.promotion;
  let finalPrice = parseFloat(course.price.magnitude);
  let coupon = null;
  if (discount) {
    let now = Date.now();
    if (discount.startDate <= now && discount.endDate > now) {
      coupon = await stripe.coupons.create({
        percent_off: discount.percentage,
      });
      finalPrice *= 1 - discount.percentage / 100;
    }
  }
  let coursePrice = finalPrice;
  let walletPayment = parseFloat(
    await getAmountPaidByWallet(
      req.session.userId,
      finalPrice,
      course.price.currency
    )
  );
  finalPrice -= walletPayment;
  if (finalPrice === 0) {
    await enrollInCourse(
      req.session.userId,
      courseID,
      coursePrice,
      0,
      "",
      walletPayment
    );
    res.json({ url: `${process.env.CLIENT_URL}/course/${courseID}` });
    return;
  }
  if (coupon) {
    finalPrice /= 1 - discount.percentage / 100;
  }
  const priceMagnitude = await currencyConverter(
    finalPrice,
    course.price.currency,
    userCurrency
  );
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.session.userId,
        courseId: courseID,
        coursePrice: coursePrice,
        walletPayment: walletPayment,
      },
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: userCurrency,
            product_data: {
              name: course.name,
              images: [course.image],
              description: course.subject,
            },
            unit_amount: Math.round(100 * priceMagnitude),
          },
          quantity: 1,
        },
      ],
      customer: customer.id,
      discounts: [
        {
          coupon: coupon?.id,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/course/${courseID}`,
      cancel_url: `${process.env.CLIENT_URL}/course/${courseID}`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const enrollInCourse = async (
  userId,
  courseId,
  coursePrice,
  paidbyCard,
  currency,
  walletPayment
) => {
  coursePrice = parseFloat(coursePrice);
  paidbyCard = parseFloat(paidbyCard);
  walletPayment = parseFloat(walletPayment);
  const course = await Course.findById(courseId);
  let walletPayments =
    walletPayment > 0
      ? await payByWallet(userId, walletPayment, course.price.currency)
      : [];
  await addPayment(userId, courseId, walletPayments, paidbyCard, currency);
  await payInstructor(
    course.instructorInfo?.instructorId,
    coursePrice,
    course.price.currency
  );
  await enrollment(userId, courseId);
};

const enrollment = async (userId, courseId) => {
  const course = await Course.findById(courseId);
  const trainee = await Trainee.findById(userId);
  course.trainees.push(userId);
  await course.save();
  trainee.courses.push(courseId);
  await trainee.save();
};

const payInstructor = async (instructorId, magnitude, currency) => {
  const instructor = await Instructor.findById(instructorId);
  let prevWalletAmount = instructor.wallet?.get(currency) ?? 0;
  prevWalletAmount = parseFloat(prevWalletAmount);
  instructor?.wallet.set(currency, prevWalletAmount + magnitude);
  await instructor?.save();
};

const addPayment = async (
  userId,
  courseId,
  walletPayments,
  paidbyCard,
  currency
) => {
  const trainee = await Trainee.findById(userId);
  if (paidbyCard > 0) {
    walletPayments.push({ magnitude: paidbyCard, currency });
  }
  trainee.payments.push({ courseId, amounts: walletPayments });
  await trainee.save();
};

module.exports = { payForCourse, enrollInCourse };
