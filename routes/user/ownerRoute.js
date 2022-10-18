const express = require("express");
const router = express.Router();
const Owner = require("../../models/user/ownerModel");
const passport = require("passport");

router.route("/user/owner").post((req, res) => {
  Owner.register({
    username: req.body.username,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    homesId: req.body.homesId
  },
  req.body.password,
  (err, user) => {
    if (err) {
      res.send(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.send("Successfully Registered Owner");
      });
    }
  }
  );
});

module.exports = router;
