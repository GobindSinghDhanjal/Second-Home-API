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

router.route("/home/:title").get((req, res) => {

  const title = req.params.title;

  Home.findOne({title: title},(err, foundHome)=>{
    if(err){
      res.send(err)
    }else{
      if(foundHome){
        res.send(foundHome);
      }else{
        res.send({msg: "not found"})
      }
      
    }
  })


});

router.route("/homes").post((req, res) => {
  const newHome = new Home({
    home_id: req.body.home_id,
    name: req.body.name,
    title: req.body.title,
    type: req.body.type,
    location: req.body.location,
    rooms: req.body.rooms,
    description: req.body.description,
    description2: req.body.description2,
    area: req.body.area,
    guests: req.body.guests,
    amenities: req.body.amenities,
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    placeImg: req.body.placeImg,
    profileImg: req.body.profileImg,
    rating: req.body.rating,
    bed: req.body.bed,
    washrooms: req.body.washrooms,
    bedroom: req.body.bedroom,
    home_id: req.body.home_id,
    price: req.body.price,
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
