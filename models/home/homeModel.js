const mongoose = require("mongoose");
const { Schema } = mongoose;

const homeSchema = Schema({
    home_id: Number,
    name: {
        type: String,
        required: [true, "name is required"]
    },
    title: String,
    type: Array,
    location: String,
    rooms: Number,
    desc: String,
    area: Number,
    guests: Number,
    amenities: Array,
    images_url: String,
    videos_url: String,
    city: String,
    state: String,
    address: String,
    weekday_price: Number,
    weekend_price: Number,
    sevenPlusDayPrice: Number,
    ThirtyDayPlusPrice: Number,
    reviews_id: String
});

// const Home = mongoose.model("Home",homeSchema);

module.exports = mongoose.model("Home",homeSchema);