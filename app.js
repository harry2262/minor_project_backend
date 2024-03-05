const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const cors = require("cors");

const errorMiddleware = require("./middleWares/errors");

//setting up config file
dotenv.config({ path: "./config/config.env" });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const hostelRoutes = require("./routes/hostel");
const userRoutes = require("./routes/user");
const otpRoutes = require("./routes/otp");
// import all routes here
app.use("/api/v1/otp/", otpRoutes);
app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/hostel/", hostelRoutes);
// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
