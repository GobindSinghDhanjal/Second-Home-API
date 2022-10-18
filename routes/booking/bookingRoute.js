const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking/bookingModel");

router.route("/booking").get((req, res) => {
  Booking.find((err, foundBooking) => {
    if (!err) {
      res.send(foundBooking);
    } else {
      res.send(err);
    }
  });
});

router.route("/booking").post((req, res) => {
  const newBooking = new Booking({
    homeId: req.body.homeId,
    touristId: req.body.touristId,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    price: req.body.price,
    status: req.body.status,
  });

  newBooking.save((err) => {
    if (!err) {
      res.send("Successfully saved the data");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
