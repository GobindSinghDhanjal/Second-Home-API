const express = require("express");
var cors = require('cors');
const mongoose = require("mongoose");
const { Schema } = mongoose;

const Connect = require('connect-pg-simple');

const session = require('express-session');
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

AdminJS.registerAdapter(AdminJSMongoose);

const PORT = 4000;

const DEFAULT_ADMIN = {
  email: "admin@example.com",
  password: "password",
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const app = express();

const start = async () => {
  const mongooseDb = await mongoose.connect(
    "mongodb+srv://admin-gobind:atlas123@cluster0.5773w.mongodb.net/secondHomeDB"
  );

  const admin = new AdminJS({
    databases: [mongooseDb],
  });

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: "postgres://postgres: @localhost:5432/postgres",
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


  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(express.static("public"));

app.use(session({
    secret:"The Secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: true
    }
}));

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
app.use("/",homeRoute);
app.use("/",bookingRoute);
app.use("/",touristRoute);
app.use("/",ownerRoute);
app.use("/",paymentRoute);
app.use("/",reviewRoute);
app.use("/",loginRoute);






app.get('/', (req, res) => {
  res.send('Hello World!')
})
