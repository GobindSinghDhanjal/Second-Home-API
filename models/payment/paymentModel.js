const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    transDate: Date,
    bookingId: Number,
    paymentId: Number
});

module.exports = mongoose.model("Payment",paymentSchema);