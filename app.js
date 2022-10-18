const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const Connect = require('connect-pg-simple');
const session = require('express-session');
const AdminJSMongoose = require ('@adminjs/mongoose');
const homeRoute = require("./routes/home/homeRoute");
const bookingRoute = require("./routes/booking/bookingRoute");
const touristRoute = require("./routes/user/touristRoute");
const ownerRoute = require("./routes/user/ownerRoute");
const paymentRoute = require("./routes/payment/paymentRoute");
const reviewRoute = require("./routes/review/reviewRoute");

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

  
    const admin = new AdminJS({})
  
    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    // const mongoseDB = await mongoose.connect('mongodb+srv://admin-gobind:atlas123@cluster0.5773w.mongodb.net/secondHomeDB');
  
    // const adminOptions = {
    //     resources: [Home2],
    //     databases : [mongoseDB]
    // }

    // app.listen(PORT, () => {
    //   console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    // })


app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin-gobind:atlas123@cluster0.5773w.mongodb.net/secondHomeDB');


//////////////    ROUTES     ///////////////////
app.use("/",homeRoute);
app.use("/",bookingRoute);
app.use("/",touristRoute);
app.use("/",ownerRoute);
app.use("/",paymentRoute);
app.use("/",reviewRoute)







app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log("Server started on PORT " + PORT)
})