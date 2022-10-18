const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Home = require("./models/home/homeModel");
const Booking = require("./models/booking/bookingModel");
const Payment = require("./models/payment/paymentModel");
const Review = require("./models/review/reviewModel");
const Owner = require("./models/user/ownerModel");
const Tourist = require("./models/user/touristModel");
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const Connect = require('connect-pg-simple');
const session = require('express-session');
const AdminJSMongoose = require ('@adminjs/mongoose');
const Home2 = require('./models/home/homeModel')

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const app = express();
const PORT = 3000;

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
}

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
  }

const start = async () => {
    const app = express()
  
    const admin = new AdminJS({})
  
    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    const mongoseDB = await mongoose.connect('mongodb+srv://admin-gobind:atlas123@cluster0.5773w.mongodb.net/secondHomeDB');
  
    const adminOptions = {
        resources: [Home2],
        databases : [mongoseDB]
    }

    app.listen(PORT, () => {
      console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
  }


app.use(bodyParser.urlencoded({
    extended:true
}));

// app.use(express.static("public"));

// mongoose.connect('mongodb+srv://admin-gobind:atlas123@cluster0.5773w.mongodb.net/secondHomeDB');

app.get("/homes",(req,res)=>{
    Home.find((err,foundHome)=>{
        if(!err){
            res.send(foundHome);
        }else{
            res.send(err);
        }
       
    });
});

app.post("/homes",(req,res)=>{

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
        reviews_id: req.body.reviews_id
    });
    newHome.save((err)=>{
        if(!err){
            res.send("Successfully added a new home");
        }else{
            res.send(err);
        }
    });
});

app.get("/booking",(req,res)=>{
    Booking.find((err,foundBooking)=>{
        if(!err){
            res.send(foundBooking);
        }else{
            res.send(err);
        }
    });
});

app.post("/booking" , (req,res) =>{

    const newBooking = new Booking({
        homeId: req.body.homeId,
        touristId: req.body.touristId,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        price: req.body.price,
        status: req.body.status
    });

    newBooking.save((err)=>{
        if(!err){
            res.send("Successfully saved the data")
        }else{
            res.send(err);
        }
    });

});


app.get("/payment",(req,res)=>{
    Payment.find((err,foundPayment)=>{
        if(!err){
            res.send(foundPayment);
        }else{
            res.send(err);
        }
    });
});

app.post("/payment" , (req,res) =>{

    const newPayment = new Payment({
        transDate: req.body.transDate,
        bookingId: req.body.bookingId,
        paymentId: req.body.paymentId
    });

    newPayment.save((err)=>{
        if(!err){
            res.send("Successfully saved the data")
        }else{
            res.send(err);
        }
    });

});


app.get("/review",(req,res)=>{
    Review.find((err,foundReview)=>{
        if(!err){
            res.send(foundReview);
        }else{
            res.send(err);
        }
    });
});

app.post("/review" , (req,res) =>{

    const newReview = new Review({
        touristId: req.body.touristId,
        description: req.body.description,
        rating: req.body.rating,
        date: req.body.date,
        homeId: req.body.homeId
    });

    newReview.save((err)=>{
        if(!err){
            res.send("Successfully saved the data")
        }else{
            res.send(err);
        }
    });

});


app.get("/user/owner",(req,res)=>{
    Owner.find((err,foundOwner)=>{
        if(!err){
            res.send(foundOwner);
        }else{
            res.send(err);
        }
    });
});

app.post("/user/owner" , (req,res) =>{

    const newOwner = new Owner({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        homesId: req.body.homeId
    });

    newOwner.save((err)=>{
        if(!err){
            res.send("Successfully saved the data")
        }else{
            res.send(err);
        }
    });

});


app.get("/user/tourist",(req,res)=>{
    Tourist.find((err,foundTourist)=>{
        if(!err){
            res.send(foundTourist);
        }else{
            res.send(err);
        }
    });
});

app.post("/user/tourist" , (req,res) =>{

    const newTourist = new Tourist({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        active_bokings: req.body.active_bokings,
        prev_bookings: req.body.prev_bookings,
        review_id:req.body.review_id
    });

    newTourist.save((err)=>{
        if(!err){
            res.send("Successfully saved the data")
        }else{
            res.send(err);
        }
    });

});







app.get('/', (req, res) => {
  res.send('Hello World!')
})

start()

// app.listen(PORT, () => {
//   console.log("Server started on PORT " + PORT)
// })