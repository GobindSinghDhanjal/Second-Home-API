const express = require("express");
const router = express.Router();
const Review = require("../../models/review/reviewModel");

router.route("/review").get((req, res) => {
  Review.find((err, foundReview) => {
    if (!err) {
      res.send(foundReview);
    } else {
      res.send(err);
    }
  });
});

router.route("/review").post((req, res) => {
  const newReview = new Review({
    touristId: req.body.touristId,
    description: req.body.description,
    rating: req.body.rating,
    date: req.body.date,
    homeId: req.body.homeId,
  });

  newReview.save((err) => {
    if (!err) {
      res.send("Successfully saved the data");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
