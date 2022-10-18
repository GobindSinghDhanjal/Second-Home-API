const express = require("express");
const router = express.Router();
const Home = require("../../models/home/homeModel");

router.route("/homes").get((req, res) => {
  Home.find((err, foundHome) => {
    if (!err) {
      res.send(foundHome);
    } else {
      res.send(err);
    }
  });
});

router.route("/homes").post((req, res) => {
  const newHome = new Home({
    name: req.body.name,
    type: req.body.type,
    location: req.body.location,
    rooms: req.body.rooms,
    desc: req.body.desc,
    area: req.body.area,
    guests: req.body.guests,
    amenities: req.body.amenities,
    images_url: req.body.images_url,
    videos_url: req.body.videos_url,
    city: req.body.city,
    state: req.body.statea,
    address: req.body.address,
    weekday_price: req.body.weekday_price,
    weekend_price: req.body.weekend_price,
    sevenPlusDayPrice: req.body.sevenPlusDayPrice,
    ThirtyDayPlusPrice: req.body.ThirtyDayPlusPrice,
    reviews_id: req.body.reviews_id,
  });
  newHome.save((err) => {
    if (!err) {
      res.send("Successfully added a new home");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
