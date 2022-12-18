require("dotenv").config();
const Course = require("../../models/Course.model");
const Trainee = require("../../models/Trainee.model");
const Instructor = require("../../models/Instructor.model");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const CC = require("currency-converter-lt");

const convertCurrency = async (req, res) => {
  const { magnitude, oldCurrency, newCurrency } = req.body;
  let converter = new CC({
    from: oldCurrency,
    to: newCurrency,
    amount: magnitude,
  });
  const priceMagnitude = await converter.convert();
  res.send({
    magnitude: priceMagnitude,
    currency: newCurrency,
    oldMagnitude: magnitude,
  });
};

const payForCourse = async (req, res) => {
  const { courseID, userCurrency } = req.body;
  const course = await Course.findById(courseID);
  let converter = new CC({
    from: course.price.currency,
    to: userCurrency,
    amount: course.price.magnitude,
  });
  const priceMagnitude = await converter.convert();
  let discount = course.promotion;
  let coupon = null;
  if (discount) {
    let now = Date.now();
    if (discount.startDate <= now && discount.endDate > now) {
      coupon = await stripe.coupons.create({
        percent_off: discount.percentage,
      });
      discount = (discount.percentage / 100) * course.price.magnitude;
    } else {
      discount = null;
    }
  }
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.session.userId,
        courseId: courseID,
        paid: discount ?? course.price.magnitude,
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

const enrollInCourse = async (userId, courseId, paid, amount, currency) => {
  const course = await Course.findById(courseId);
  const trainee = await Trainee.findById(userId);
  const instructor = await Instructor.findById(
    course.instructorInfo.instructorId
  );
  course.trainees.push(userId);
  await course.save();
  trainee.courses.push(courseId);
  await trainee.save();
  trainee.payments.push({ courseId, amount, currency });
  await trainee.save();
  const prevWalletAmount = instructor.wallet.get(course.price.currency) ?? 0;
  instructor.wallet.set(course.price.currency, prevWalletAmount + paid);
  await instructor.save();
};

module.exports = { payForCourse, enrollInCourse, convertCurrency };
