require("dotenv").config();
const stripe = require("stripe");
const express = require("express");
const router = express.Router();

// import controllers
const { enrollInCourse } = require("../controllers/trainee/payment.controller");

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      console.log(err.message);
      return;
    }

    // Handle the event
    if (event.type === "payment_intent.succeeded") {
      const data = event.data.object;
      const customer = await stripe(
        process.env.STRIPE_PRIVATE_KEY
      ).customers.retrieve(data.customer);
      console.log(customer.metadata);
      await enrollInCourse(
        customer.metadata.userId,
        customer.metadata.courseId,
        customer.metadata.coursePrice,
        data.amount / 100,
        data.currency,
        customer.metadata.walletPayments
      );
    }

    response.send().end();
  }
);

module.exports = router;
