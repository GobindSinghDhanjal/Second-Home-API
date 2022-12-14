const express = require("express");
const router = express.Router();
const Home = require("../../models/home/homeModel");
const axios = require("axios");
const { response } = require("express");

const homesPerPage = 2;

router.route("/homes/:homepage").get((req, res) => {
  const homepage = req.params.homepage;

  Home.find()
    .skip((homepage - 1) * homesPerPage)
    .limit(homesPerPage)
    .then((err, foundHome) => {
      if (!err) {
        console.log(foundHome);
        res.send(foundHome);
      } else {
        res.send(err);
      }
    });
});

router.route("/featuredHomes").get((req, res) => {
  Home.find({ featured: true }).then((err, foundHome) => {
    if (!err) {
      console.log(foundHome);
      res.send(foundHome);
    } else {
      res.send(err);
    }
  });
});

router.route("/homes/:location/:homepage").get((req, res) => {
  const homepage = req.params.homepage;
  const location = req.params.location;

  if (location === "All") {
    Home.find()
      .skip((homepage - 1) * homesPerPage)
      .limit(homesPerPage)
      .then((err, foundHome) => {
        if (!err) {
          console.log(foundHome);
          res.send(foundHome);
        } else {
          res.send(err);
        }
      });
  } else {
    Home.find({ location: location }, (err, homes) => {

      console.log(homes.length);

      if (homes.length >= 2) {
        Home.find({ location: location })
          .skip((homepage - 1) * homesPerPage)
          .limit(homesPerPage)
          .then((err, foundHome) => {
            if (!err) {
              console.log(foundHome);
              res.send(foundHome);
            } else {
              res.send(err);
            }
          });
      } else {
        Home.find({ location: location }).then((err, foundHome) => {
          if (!err) {
            console.log(foundHome);
            res.send(foundHome);
          } else {
            res.send(err);
          }
        });
      }
    });
  }
});

router.route("/home/:title").get((req, res) => {
  const title = req.params.title;

  Home.findOne({ title: title }, async (err, foundHome) => {
    if (err) {
      res.send(err);
    } else {
      if (foundHome) {
        const params = {
          access_key: process.env.POSITION_STACK_KEY,
          query: foundHome.location + ",India",
        };

        const coordinates = foundHome.coordinates;

        if (
          coordinates.latitude == 0 ||
          coordinates.latitude == null ||
          coordinates.longitude == 0 ||
          coordinates.longitude == null
        ) {
          await axios
            .get("http://api.positionstack.com/v1/forward", { params })
            .then((response) => {
              const newCoordinates = {
                latitude: response.data.data[0].latitude,
                longitude: response.data.data[0].longitude,
              };

              Home.findOneAndUpdate(
                { title: title },
                { $set: { coordinates: newCoordinates } },
                { new: true },
                (err, doc) => {
                  if (!err) {
                    res.send(doc);
                  } else {
                    console.log("inside err");
                    console.log(err);
                  }
                }
              );
            })
            .catch((error) => {
              console.log(error.response);
            });
        } else {
          res.send(foundHome);
        }

        // res.send(foundHome);
      } else {
        res.send({ msg: "not found" });
      }
    }
  });
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
