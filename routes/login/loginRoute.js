const express = require("express");
const router = express.Router();
const Tourist = require("../../models/user/touristModel");
const Owner = require("../../models/user/ownerModel");
const passport = require("passport");

router.route("/login/tourist").post((req, res) => {

    const tourist = new Tourist({
        username: req.body.username,
        password: req.body.password
    });

    req.login(tourist, (err)=>{
        if(err){
            res.send("Wrong Username or password");
        }else{
            passport.authenticate("local")(req, res, function () {
                username = tourist.username;
                req.session.username = username;
                res.send({msg : "success",username});
              });
        }
    });
});

router.route("/login/owner").post((req, res) => {

    const owner = new Owner({
        username: req.body.username,
        password: req.body.password
    });

    req.login(owner, (err)=>{
        if(err){
            res.send("Wrong Username or password");
        }else{
            passport.authenticate("local")(req, res, function () {
                res.send("Successfully Login Owner");
              });
        }
    });



//   Owner.findOne({ email: email }, (err, foundUser) => {
//     if (err) {
//       res.send(err);
//     } else {
//       if (foundUser.password === password) {
//         res.send("Successfully Login Owner");
//       } else {
//         res.send("Wrong email or password");
//       }
//     }
//   });
});

module.exports = router;
