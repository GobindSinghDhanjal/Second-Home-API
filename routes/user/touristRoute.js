const express = require("express");
const router = express.Router();
const Tourist = require("../../models/user/touristModel");

router.route("/user/tourist").get((req, res) => {
  Tourist.find((err, foundTourist) => {
    if (!err) {
      res.send(foundTourist);
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
