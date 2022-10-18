const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const touristSchema = new mongoose.Schema({
    name: String,
    password: String,
    phone: Number,
    email: String,
    active_bookings: Array,
    prev_bookings: Array,
    review_id: Number
});

touristSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("TouristDetails",touristSchema);