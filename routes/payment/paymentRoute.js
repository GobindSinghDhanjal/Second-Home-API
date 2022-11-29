const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Payment = require("../../models/payment/paymentModel");
require("dotenv").config();
const Razorpay = require("razorpay");
const Home = require("../../models/home/homeModel");
const Booking = require("../../models/booking/bookingModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Tourist = require("../../models/user/touristModel");

function calculatePricing(
  price,
  monthWiseSeasonFactor,
  weekdayPrice,
  weekendPrice,
  weeklyDiscount,
  monthlyDiscount,
  checkIn,
  checkOut
) {
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);

  const weekdayArray = [1, 2, 3, 4];
  const weekendArray = [0, 5, 6];

  function countCertainDays(days, d0, d1) {
    var ndays = Math.round((d1 - d0) / (24 * 3600 * 1000));
    console.log(ndays);
    var sum = function (a, b) {
      return a + Math.floor((ndays + ((d0.getDay() + 6 - b) % 7)) / 7);
    };
    return days.reduce(sum, 0);
  }

  const nweekends = countCertainDays(weekendArray, date1, date2);
  const nweekdays = countCertainDays(weekdayArray, date1, date2);

  console.log(diffInDays);
  console.log("weekends : ");
  console.log(nweekends);
  console.log("weekday : ");
  console.log(nweekdays);

  var totalPrice = Math.round(
    price *
      monthWiseSeasonFactor *
      (nweekdays * weekdayPrice + nweekends * weekendPrice)
  );

  console.log(totalPrice);

  // const subTotalPrice = price * 100 * diffInDays;
  // const totalPrice = String(subTotalPrice + subTotalPrice * 0.062542);

  if (diffInDays > 30) {
    return parseInt(totalPrice * monthlyDiscount);
  } else if (diffInDays > 7) {
    return parseInt(totalPrice * weeklyDiscount);
  }
  return parseInt(totalPrice);
}

router.route("/payment").get((req, res) => {
  Payment.find((err, foundPayment) => {
    if (!err) {
      res.send(foundPayment);
    } else {
      res.send(err);
    }
  });
});

router.route("/payment").post((req, res) => {
  const newPayment = new Payment({
    transDate: req.body.transDate,
    bookingId: req.body.bookingId,
    paymentId: req.body.paymentId,
  });

  newPayment.save((err) => {
    if (!err) {
      res.send("Successfully saved the data");
    } else {
      res.send(err);
    }
  });
});

router.post("/payment/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // const { token, place_id, checkIn, checkOut } = req.body;
    const { user, place_id, checkIn, checkOut } = req.body;

    // const decodeToken = jwt.verify(token,process.env.SECRET);
    // const username = decodeToken.username;
    // console.log(username);

    Home.findOne({ _id: place_id }, async (err, data) => {
      if (data) {
        // console.log(data);
        const price = calculatePricing(
          data.price,
          data.monthwise_season_factor,
          data.weekday_price,
          data.weekend_price,
          data.weekly_discount,
          data.monthly_discount,
          checkIn,
          checkOut
        );

        console.log(typeof price);

        try {
          const options = {
            amount: parseInt(price) * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
            notes: {
              // username: username,
              user: user,
              place_id: place_id,
              checkIn: checkIn,
              checkOut: checkOut,
            },
          };
          const order = await instance.orders.create(options);

          if (!order) return res.status(500).send("Some error occured");

          res.json(order);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/payment/success", async (req, res) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      amount,
    } = req.body;

    // const { username, place_id, checkIn, checkOut } = req.body.notes;
    const { user, place_id, checkIn, checkOut } = req.body.notes;

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    const today = new Date();

    Home.findById(place_id, (err, home) => {
      if (!err) {
        if (home) {
          const newBooking = new Booking({
            home_id: place_id,
            // touristUsername: username,
            touristEmail: user,
            bookingDate: today,
            checkIn: checkIn,
            checkOut: checkOut,
            amount: amount,
            home: home,
          });

          newBooking.save((err, booking) => {
            if (!err) {
              console.log("Successfully saved the data");

              console.log(booking);

              // Tourist.findOneAndUpdate(
              //   { username: username },
              //   { $push: { all_bookings: booking._id } },
              //   (err, update) => {
              //     if (!err) {
              //       console.log("inside update");
              //       console.log(update);
              //     } else {
              //       console.log("inside err");
              //       console.log(err);
              //     }
              //   }
              // );

              res.json({
                msg: "success",
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
              });
            } else {
              console.log("inside errorrr");
              console.log(err);
              res.send(err);
            }
          });
        }
      } else {
        return err;
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
