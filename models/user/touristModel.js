const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const touristSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: String,
    phone: Number,
    all_bookings: Array,
    active_bookings: Array,
    prev_bookings: Array,
    review_id: Number
});

touristSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("TouristDetails",touristSchema);