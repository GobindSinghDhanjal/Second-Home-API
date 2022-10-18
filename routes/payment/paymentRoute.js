const express = require("express");
const router = express.Router();
const Payment = require("../../models/payment/paymentModel");

router.route("/payment").get((req, res) => {
  Payment.find((err, foundPayment) => {
    if (!err) {
      res.send(foundPayment);
    } else {
      res.send(err);
    }
  });
});

router.route("/payment").post((req, res) => {
  const newPayment = new Payment({
    transDate: req.body.transDate,
    bookingId: req.body.bookingId,
    paymentId: req.body.paymentId,
  });

  newPayment.save((err) => {
    if (!err) {
      res.send("Successfully saved the data");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
