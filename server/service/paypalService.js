const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "YOUR_CLIENT_ID",
  client_secret: "YOUR_CLIENT_SECRET",
});

exports.createPayment = async (paymentData) => {
  const createPaymentJson = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: paymentData.amount,
        },
        description: paymentData.description,
      },
    ],
    redirect_urls: {
      return_url: "http://localhost:3000/api/v1/paypal/success",
      cancel_url: "http://localhost:3000/api/v1/paypal/cancel",
    },
  };

  return new Promise((resolve, reject) => {
    paypal.payment.create(createPaymentJson, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
};

exports.executePayment = async (paymentId, payerId) => {
  const executePaymentJson = {
    payer_id: payerId,
  };

  return new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
};
