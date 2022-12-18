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
    amount: parseFloat(magnitude),
  });
  const priceMagnitude = await converter.convert();
  res.send({
    magnitude: priceMagnitude,
    currency: newCurrency,
  });
};

const payForCourse = async (req, res) => {
  const { courseID, userCurrency } = req.body;
  let walletPayment = 0;
  const trainee = await Trainee.findById(req.session.userId);
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
  let savedPrice = finalPrice;
  let traineeWalletAmount = trainee.wallet?.get(course.price.currency);
  if (traineeWalletAmount) {
    if (traineeWalletAmount >= finalPrice) {
      walletPayment += finalPrice;
      await enrollInCourse(
        req.session.userId,
        courseID,
        finalPrice,
        0,
        "USD",
        walletPayment
      );
      res.json({ url: `${process.env.CLIENT_URL}/course/${courseID}` });
      return;
    } else {
      walletPayment += traineeWalletAmount;
      finalPrice -= traineeWalletAmount;
    }
  }
  for (let [currency, magnitude] of trainee.wallet) {
    let walletConverter = new CC({
      from: currency,
      to: course.price.currency,
      amount: parseFloat(magnitude),
    });
    const newMagnitude = await walletConverter.convert();
    if (newMagnitude < finalPrice) {
      walletConverter += newMagnitude;
      finalPrice -= newMagnitude;
    } else {
      walletPayment += finalPrice;
      await enrollInCourse(
        req.session.userId,
        courseID,
        savedPrice,
        0,
        "USD",
        walletPayment
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

const getWallet = async (req, res) => {
  const trainee = await Trainee.findById(req.session.userId);
  res.send(trainee.wallet);
};

const payByWallet = async (userId, amount, currency) => {
  amount = parseFloat(amount);
  const trainee = await Trainee.findById(userId);
  if (amount == 0) return [];
  let walletPayments = [];
  let traineeWalletAmount = trainee.wallet?.get(currency);
  if (traineeWalletAmount) {
    traineeWalletAmount = parseFloat(traineeWalletAmount);
    if (traineeWalletAmount >= amount) {
      trainee.wallet.set(currency, traineeWalletAmount - amount);
      await trainee.save();
      walletPayments.push({
        magnitude: amount,
        currency: currency,
      });
      return walletPayments;
    } else {
      trainee.wallet.set(currency, 0);
      await trainee.save();
      walletPayments.push({
        magnitude: traineeWalletAmount,
        currency: currency,
      });
      amount -= traineeWalletAmount;
    }
  }
  for (let [curr, magnitude] of trainee.wallet) {
    magnitude = parseFloat(magnitude);
    let walletConverter = new CC({
      from: curr,
      to: currency,
      amount: magnitude,
    });
    const newMagnitude = await walletConverter.convert();
    if (newMagnitude < amount) {
      trainee.wallet.set(curr, 0);
      await trainee.save();
      walletPayments.push({
        magnitude: magnitude,
        currency: curr,
      });
      amount -= newMagnitude;
    } else {
      walletConverter = new CC({
        from: currency,
        to: curr,
        amount: amount,
      });
      amount = await walletConverter.convert();
      trainee.wallet.set(currency, magnitude - amount);
      await trainee.save();
      walletPayments.push({
        magnitude: amount,
        currency: curr,
      });

      return walletPayments;
    }
  }
  return walletPayments;
};

const enrollInCourse = async (
  userId,
  courseId,
  paid,
  amount,
  currency,
  walletPayment
) => {
  const course = await Course.findById(courseId);
  const trainee = await Trainee.findById(userId);
  const instructor = await Instructor.findById(
    course.instructorInfo?.instructorId
  );
  let walletPayments = await payByWallet(
    userId,
    walletPayment,
    course.price.currency
  );
  course.trainees.push(userId);
  await course.save();
  trainee.courses.push(courseId);
  await trainee.save();
  console.log(amount);
  if (amount > 0) {
    walletPayments.push({ magnitude: parseFloat(amount), currency });
  }
  trainee.payments.push({ courseId, amounts: walletPayments });
  await trainee.save();
  const prevWalletAmount = instructor.wallet.get(course.price.currency) ?? 0;
  instructor?.wallet.set(course.price.currency, prevWalletAmount + paid);
  await instructor?.save();
};

module.exports = { payForCourse, enrollInCourse, convertCurrency, getWallet };
