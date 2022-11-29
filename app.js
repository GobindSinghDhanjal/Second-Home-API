const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();
const Connect = require("connect-pg-simple");

const session = require("express-session");
const router = express.Router();
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const MAX_AGE = 1000 * 60 * 60 * 3;

/////////////   REQUIRED ROUTES    //////////////////
const homeRoute = require("./routes/home/homeRoute");
const bookingRoute = require("./routes/booking/bookingRoute");
const touristRoute = require("./routes/user/touristRoute");
const ownerRoute = require("./routes/user/ownerRoute");
const paymentRoute = require("./routes/payment/paymentRoute");
const reviewRoute = require("./routes/review/reviewRoute");
const loginRoute = require("./routes/login/loginRoute");

const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");

const AdminJSMongoose = require("@adminjs/mongoose");
const touristModel = require("./models/user/touristModel");
const ownerModel = require("./models/user/ownerModel");
const bookingModel = require("./models/booking/bookingModel");
const homeModel = require("./models/home/homeModel");



// const files = require("./public/files")


/////////////////  MULTER    ////////////////////////

// const fs= require("fs");
// const path = require("path");
// const multer = require('multer');

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// var upload = multer({ storage: storage });

AdminJS.registerAdapter(AdminJSMongoose);

const PORT = 4000;

const DEFAULT_ADMIN = {
  email: "admin@example.com",
  password: "password",
};

////////////////////



///////////////////////////////////


const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const app = express();

const start = async () => {
  const mongooseDb = await mongoose.connect(process.env.MONGO_DB_URI);

  const homeResourceOptions = {
    properties: {
      description: {
        type: "richtext",
        custom: {
          modules: {
            toolbar: [
              ["bold", "italic"],
              ["link", "formula"],
            ],
          },
        },
      },
    },
  }

  // const admin = new AdminJS({
  //   resources: [mongooseDb],
  // });


  const adminOptions = {
    // We pass Category to `resources`
    resources: [
      {
        resource: homeModel,
        options: homeResourceOptions,
      },
      // files,
      { resource: bookingModel },
      { resource: touristModel },
      { resource: ownerModel },
    ],
  };

  const admin = new AdminJS(adminOptions);

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: process.env.POSTGRES_CONNECTION_STRING,
      ssl: process.env.NODE_ENV === "development",
    },
    tableName: "session",
    createTableIfMissing: true,
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: "sessionsecret",
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: "sessionsecret",
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  ///////////////////////////////////////////

  app.use(cors());

  app.use(express.static("public"));

  // app.use(express.static(path.join(__dirname, '../public')));

  app.use(
    session({
      secret: "The Secret",
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: MAX_AGE,
        sameSite: false,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(ownerModel.createStrategy());
  passport.serializeUser(ownerModel.serializeUser());
  passport.deserializeUser(ownerModel.deserializeUser());

  passport.use(touristModel.createStrategy());
  passport.serializeUser(touristModel.serializeUser());
  passport.deserializeUser(touristModel.deserializeUser());

  //////////////    ROUTES     ///////////////////
  app.use(router);
  app.use("/", homeRoute);
  app.use("/", bookingRoute);
  app.use("/", touristRoute);
  app.use("/", ownerRoute);
  app.use("/", paymentRoute);
  app.use("/", reviewRoute);
  app.use("/", loginRoute);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  /////////////////////////////////////

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
