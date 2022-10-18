const express = require("express");
const router = express.Router();
const Tourist = require("../../models/user/touristModel");
const passport = require("passport");

router.route("/user/tourist").post((req, res) => {
  Tourist.register(
    {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      active_bokings: req.body.active_bokings,
      prev_bookings: req.body.prev_bookings,
      review_id: req.body.review_id,
    },
    req.body.password,
    (err, user) => {
      if (err) {
        res.send(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.send("Successfully Registered Tourist");
        });
      }
    }
  );

});

module.exports = router;
