const mongoose = require("mongoose");

const touristSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    active_bookings: Array,
    prev_bookings: Array,
    review_id: Number
});

module.exports = mongoose.model("TouristDetails",touristSchema);