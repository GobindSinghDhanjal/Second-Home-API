const express = require("express");
const router = express.Router();
const Owner = require("../../models/user/ownerModel");

router.route("/user/owner").get((req, res) => {
  Owner.find((err, foundOwner) => {
    if (!err) {
      res.send(foundOwner);
    } else {
      res.send(err);
    }
  });
});

router.route("/user/owner").post((req, res) => {
  const newOwner = new Owner({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    homesId: req.body.homeId,
  });

  newOwner.save((err) => {
    if (!err) {
      res.send("Successfully saved the data");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
