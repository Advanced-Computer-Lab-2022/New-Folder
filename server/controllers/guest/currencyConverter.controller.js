const CC = require("currency-converter-lt");

const convertCurrency = async (req, res) => {
  try {
    const { magnitude, oldCurrency, newCurrency } = req.body;
    const newMagnitude = await currencyConverter(
      magnitude,
      oldCurrency,
      newCurrency
    );
    res.status(200).send({
      magnitude: newMagnitude,
      currency: newCurrency,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const currencyConverter = async (magnitude, oldCurrency, newCurrency) => {
  let converter = new CC({
    from: oldCurrency,
    to: newCurrency,
    amount: parseFloat(magnitude),
  });
  const newMagnitude = await converter.convert();
  return parseFloat(newMagnitude);
};

module.exports = { convertCurrency, currencyConverter };
