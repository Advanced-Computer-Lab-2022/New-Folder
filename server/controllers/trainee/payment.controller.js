require("dotenv").config();
const Course = require("../../models/Course.model");
const Trainee = require("../../models/Trainee.model");
const Instructor = require("../../models/Instructor.model");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const CC = require("currency-converter-lt");

const convertCurrency = async (req, res) => {
  const { magnitude, oldCurrency, newCurrency } = req.body;
  let walletPayments = [];
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
  const trainee = await Trainee.findById(req.session.userId);
  const course = await Course.findById(courseID);
  let discount = course.promotion;
  let finalPrice = course.price.magnitude;
  let coupon = null;
  if (discount) {
    let now = Date.now();
    if (discount.startDate <= now && discount.endDate > now) {
      coupon = await stripe.coupons.create({
        percent_off: discount.percentage,
      });
      finalPrice *= discount.percentage / 100;
    }
  }
  let traineeWalletAmount = trainee.wallet?.get(course.price.currency);
  if (traineeWalletAmount) {
    if (traineeWalletAmount >= finalPrice) {
      trainee.wallet.set(
        course.price.currency,
        traineeWalletAmount - finalPrice
      );
      await trainee.save();
      walletPayments.push({
        magnitude: finalPrice,
        currency: course.price.currency,
      });
      await enrollInCourse(
        req.session.userId,
        courseID,
        finalPrice,
        0,
        "USD",
        walletPayments
      );
      res.json({ url: `${process.env.CLIENT_URL}/course/${courseID}` });
      return;
    } else {
      trainee.wallet.set(course.price.currency, 0);
      await trainee.save();
      walletPayments.push({
        magnitude: traineeWalletAmount,
        currency: course.price.currency,
      });
      finalPrice -= traineeWalletAmount;
    }
  }
  for (let [currency, magnitude] of trainee.wallet) {
    let walletConverter = new CC({
      from: currency,
      to: course.price.currency,
      amount: magnitude,
    });
    const newMagnitude = await walletConverter.convert();
    if (newMagnitude < finalPrice) {
      trainee.wallet.set(currency, 0);
      await trainee.save();
      walletPayments.push({
        magnitude: magnitude,
        currency: currency,
      });
      finalPrice -= newMagnitude;
    } else {
      walletConverter = new CC({
        from: course.price.currency,
        to: currency,
        amount: finalPrice,
      });
      finalPrice = await walletConverter.convert();
      trainee.wallet.set(currency, magnitude - finalPrice);
      await trainee.save();
      walletPayments.push({
        magnitude: finalPrice,
        currency: currency,
      });
      await enrollInCourse(
        req.session.userId,
        courseID,
        finalPrice,
        0,
        "USD",
        walletPayments
      );
      res.json({ url: `${process.env.CLIENT_URL}/course/${courseID}` });
      return;
    }
  }
  let now = Date.now();
  if (discount && discount.startDate <= now && discount.endDate > now) {
    finalPrice /= discount.percentage / 100;
  }
  let converter = new CC({
    from: course.price.currency,
    to: userCurrency,
    amount: finalPrice,
  });
  const priceMagnitude = await converter.convert();
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.session.userId,
        courseId: courseID,
        paid: finalPrice,
        walletPayments: walletPayments,
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

const getWallet = async (req, res) => {
  const trainee = await Trainee.findById(req.session.userId);
  res.send(trainee.wallet);
};

const enrollInCourse = async (
  userId,
  courseId,
  paid,
  amount,
  currency,
  walletPayments
) => {
  const course = await Course.findById(courseId);
  const trainee = await Trainee.findById(userId);
  const instructor = await Instructor.findById(
    course.instructorInfo.instructorId
  );
  course.trainees.push(userId);
  await course.save();
  trainee.courses.push(courseId);
  await trainee.save();
  walletPayments.push({ magnitude: amount, currency });
  trainee.payments.push({ courseId, amounts: walletPayments });
  await trainee.save();
  const prevWalletAmount = instructor.wallet.get(course.price.currency) ?? 0;
  instructor.wallet.set(course.price.currency, prevWalletAmount + paid);
  await instructor.save();
};

module.exports = { payForCourse, enrollInCourse, convertCurrency, getWallet };
