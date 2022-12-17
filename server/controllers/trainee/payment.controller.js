require("dotenv").config();
const Course = require("../../models/Course.model");
const Trainee = require("../../models/Trainee.model");
const Instructor = require("../../models/Instructor.model");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const CC = require("currency-converter-lt");
let currencyConverter = new CC();

const payForCourse = async (req, res) => {
  const { courseID, userCurrency } = req.body;
  const course = await Course.findById(courseID);
  const priceMagnitude = await currencyConverter
    .from(course.price.currency)
    .to(userCurrency)
    .amount(course.price.magnitude)
    .convert();
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: userCurrency,
            // amount_discount: course.promotion?.percentage,
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
      client_reference_id: req.session.userId,
      success_url: `${process.env.CLIENT_URL}/paymentSuccessful`,
      cancel_url: `${process.env.CLIENT_URL}/course/${courseID}`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const enrollInCourse = async (courseID) => {};

module.exports = { payForCourse };
