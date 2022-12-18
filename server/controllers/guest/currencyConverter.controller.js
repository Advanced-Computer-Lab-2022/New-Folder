const CC = require("currency-converter-lt");

const convertCurrency = async (req, res) => {
  const { magnitude, oldCurrency, newCurrency } = req.body;
  const newMagnitude = await currencyConverter(
    magnitude,
    oldCurrency,
    newCurrency
  );
  res.send({
    magnitude: newMagnitude,
    currency: newCurrency,
  });
};

const currencyConverter = async (magnitude, oldCurrency, newCurrency) => {
  let converter = new CC({
    from: oldCurrency,
    to: newCurrency,
    amount: parseFloat(magnitude),
  });
  const newMagnitude = await converter.convert();
  return newMagnitude;
};

module.exports = { convertCurrency, currencyConverter };
