const mongoose = require("mongoose");
const { Schema } = mongoose;

const homeSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  title: String,
  type: String,
  location: String,
  rooms: Number,
  description: String,
  description2: String,
  area: Number,
  guests: Number,
  amenities: Array,
  city: String,
  state: String,
  address: String,
  placeImg: String,
  profileImg: String,
  all_images:Array,
  rating: Number,
  bed: Number,
  washrooms: Number,
  bedroom: Number,
  home_id: Number,
  price: Number,
  monthwise_season_factor: Number,
  weekday_price: Number,
  weekend_price: Number,
  weekly_discount: Number,
  monthly_discount: Number,
  reviews_id: Array,
  coordinates: {
    latitude:Number,
    longitude:Number
  },
});

// const Home = mongoose.model("Home",homeSchema);

module.exports = mongoose.model("Home", homeSchema);
