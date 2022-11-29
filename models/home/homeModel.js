const mongoose = require("mongoose");
const { Schema } = mongoose;

const homeSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  rooms: Number,
  description: { type: String, required: true },
  area: Number,
  guests: Number,
  amenities: Array,
  city: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  placeImg: { type: String, required: true },
  profileImg: { type: String, required: true },
  all_images: Array,
  rating: Number,
  bed: Number,
  // multerImg: {
  //   data: Buffer,
  //   contentType: String,
  // },
  s3Key: String,
  bucket: String,
  mime: String,
  washrooms: Number,
  bedroom: Number,
  home_id: Number,
  featured: { type: Boolean, default: false },
  price: Number,
  monthwise_season_factor: { type: Number, default: 1.1 },
  weekday_price: { type: Number, default: 1 },
  weekend_price: { type: Number, default: 1 },
  weekly_discount: { type: Number, default: 0 },
  monthly_discount: { type: Number, default: 0 },
  reviews_id: Array,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
});

// const Home = mongoose.model("Home",homeSchema);

module.exports = mongoose.model("Home", homeSchema);
