const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking/bookingModel");
const Home = require("../../models/home/homeModel");

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
    homeId: req.body.place_id,
    touristUsername: req.body.username,
    touristEmail: req.body.user,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    bookingDate: req.body.bookingDate,
    amount: req.body.amount,
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

router.route("/all-bookings").post((req, res) => {

  const touristEmail = req.body.touristEmail;


  Booking.find({touristEmail: touristEmail},(err, foundBookings) => {
    if (!err) {
      res.send(foundBookings);
    } else {
      res.send(err);
    }
  });

});

router.route("/booking-detail").post((req, res) => {

  const touristEmail = req.body.touristEmail;
  const bookingId = req.body.bookingId;

  Booking.findById(bookingId,(err, foundBooking) => {
    if (!err) {
      res.send(foundBooking);
    } else {
      res.send(err);
    }
  });

});

module.exports = router;
