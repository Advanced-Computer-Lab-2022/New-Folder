require("dotenv").config();
const Course = require("../../models/Course.model");
const Trainee = require("../../models/Trainee.model");
const Instructor = require("../../models/Instructor.model");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { currencyConverter } = require("../guest/currencyConverter.controller");

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

const getAmountPaidByWallet = async (amount, currency) => {};

module.exports = { getWallet, payByWallet, getAmountPaidByWallet };
