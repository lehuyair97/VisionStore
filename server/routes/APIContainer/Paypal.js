const paypalService = require("../../service/paypalService");

exports.createPayment = async (req, res) => {
  try {
    const payment = await paypalService.createPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.executePayment = async (req, res) => {
  try {
    const { paymentId, payerId } = req.body;
    const result = await paypalService.executePayment(paymentId, payerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelPayment = (req, res) => {
  try {
    res.status(200).json({ message: "Payment canceled by user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
