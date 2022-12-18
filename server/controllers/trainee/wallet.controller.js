const Trainee = require("../../models/Trainee.model");
const { currencyConverter } = require("../guest/currencyConverter.controller");

const getWallet = async (req, res) => {
  const trainee = await Trainee.findById(req.session.userId);
  const wallet = trainee.wallet;
  const arrayOfAmounts = [];
  for (let [currency, magnitude] of wallet) {
    arrayOfAmounts.push(`${magnitude}  ${currency.toUpperCase()}`);
  }
  res.send(arrayOfAmounts);
};

const payByWallet = async (userId, amount, currency) => {
  amount = parseFloat(amount);
  currency = currency.toLowerCase();
  const trainee = await Trainee.findById(userId);
  let walletPayments = [];
  if (amount === 0) return walletPayments;
  let wallet = trainee.wallet;
  let amountOfSameCurrency = wallet.get(currency);
  if (amountOfSameCurrency) {
    amountOfSameCurrency = parseFloat(amountOfSameCurrency);
    if (amountOfSameCurrency > amount) {
      wallet.set(currency, amountOfSameCurrency - amount);
      await trainee.save();
      walletPayments.push({ magnitude: amount, currency });
      return walletPayments;
    } else {
      wallet.delete(currency);
      await trainee.save();
      walletPayments.push({ magnitude: amountOfSameCurrency, currency });
      amount -= amountOfSameCurrency;
    }
  }
  for (let [walletCurrency, walletMagnitude] of wallet) {
    let convertedMagnitude = await currencyConverter(
      walletMagnitude,
      walletCurrency,
      currency
    );
    if (convertedMagnitude <= amount) {
      wallet.delete(walletCurrency);
      await trainee.save();
      walletPayments.push({
        magnitude: parseFloat(walletMagnitude),
        currency: walletCurrency,
      });
      amount -= convertedMagnitude;
    } else {
      let takenMagnitude = await currencyConverter(
        amount,
        currency,
        walletCurrency
      );
      wallet.set(walletCurrency, parseFloat(walletMagnitude) - takenMagnitude);
      await trainee.save();
      walletPayments.push({
        magnitude: parseFloat(takenMagnitude),
        currency: walletCurrency,
      });
      amount = 0;
    }
    if (amount === 0) {
      return walletPayments;
    }
  }
  return walletPayments;
};

const getAmountPaidByWallet = async (userId, amount, currency) => {
  amount = parseFloat(amount);
  currency = currency.toLowerCase();
  let paidByWallet = 0;
  const trainee = await Trainee.findById(userId);
  let wallet = trainee.wallet;
  if (!wallet) return 0;
  let amountOfSameCurrency = wallet.get(currency);
  if (amountOfSameCurrency) {
    amountOfSameCurrency = parseFloat(amountOfSameCurrency);
    if (amountOfSameCurrency >= amount) return amount;
    else paidByWallet += amountOfSameCurrency;
  }
  for (let [walletCurrency, walletMagnitude] of wallet) {
    if (walletCurrency === currency) continue;
    let convertedMagnitude = await currencyConverter(
      walletMagnitude,
      walletCurrency,
      currency
    );
    paidByWallet += convertedMagnitude;
    if (paidByWallet >= amount) return amount;
  }
  return paidByWallet;
};

module.exports = { getWallet, payByWallet, getAmountPaidByWallet };
