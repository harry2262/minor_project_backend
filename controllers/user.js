const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandlers");
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");
const OTP = require("../models/otp");
// Register a user     => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req);
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    otp: req.body.otp,
  };
  if (newUserData.email) {
    const tempUser = await User.findOne({ email: newUserData.email });
    if (tempUser) {
      return next(new ErrorHandler("User id already exists", 400));
    }
  }
  const response = await OTP.find({ email: newUserData.email })
    .sort({ createdAt: -1 })
    .limit(1);
  if (response.length === 0 || newUserData.otp !== response[0].otp) {
    return next(new ErrorHandler("otp not valid", 400));
  }
  const user = await User.create(newUserData);
  sendToken(user, 200, res);
});

// Login user     => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // check if email and password are entered or not
  if (!email) {
    return next(new ErrorHandler("Please enter user id", 400));
  }
  if (!password) {
    return next(new ErrorHandler("Please enter password", 400));
  }
  let user;
  user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Finding user in database
  // const user = await User.findOne({ email }).select("+password");

  // check password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Id or Password", 401));
  }
  sendToken(user, 200, res);
});

// Get currently logged in user details     =>  /api/v1/me
// Logout user         =>     /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };
  res.status(200).cookie("token", null, options).json({
    success: true,
    message: "Logged out !!",
  });
});
