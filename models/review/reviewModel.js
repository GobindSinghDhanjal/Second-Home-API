const mongoose = require("mongoose");

const reviewsSchema =  new mongoose.Schema({
    touristId: Number,
    description: String,
    rating: Number,
    date: Date,
    homeId: Number
});

module.exports = mongoose.model("Reviews", reviewsSchema);