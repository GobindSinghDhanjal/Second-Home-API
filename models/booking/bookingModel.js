const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  home_id: String,
  touristUsername: String,
  touristEmail: String,
  checkIn: Date,
  checkOut: Date,
  bookingDate: Date,
  amount: Number,
  status: String,
  rating: Number,
  home: Object,
});

module.exports = mongoose.model("Booking", bookingSchema);
