const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    homeId: Number,
    touristUsername: String,
    checkIn: Date,
    checkOut: Date,
    amount: Number,
    status: String
});

module.exports = mongoose.model("Booking",bookingSchema);