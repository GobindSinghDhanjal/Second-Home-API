const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    homeId: Number,
    touristId: Number,
    checkIn: Date,
    checkOut: Date,
    price: Number,
    status: String
});

module.exports = mongoose.model("Booking",bookingSchema);