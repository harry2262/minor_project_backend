const Hostel = require("../models/hostel");
const ErrorHandler = require("../utils/errorHandlers");
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const Room = require("../models/rooms");
exports.addHostel = catchAsyncErrors(async (req, res, next) => {
  let hostelData = {
    name: req.body.name,
    floorCount: req.body.floorCount,
    roomCount: req.body.roomCount,
  };
  let result = await Hostel.findOne({ name: hostelData.name });
  if (result) {
    console.log(result);
    return next(new ErrorHandler("hostel already exists", 400));
  }
  result = await Hostel.create(hostelData);
  if (!result) {
    return next(new ErrorHandler("hostel not added", 400));
  }

  res.status(200).json({
    success: true,
    message: "hostel added successfully",
  });
});

exports.updateHostel = catchAsyncErrors(async (req, res, next) => {
  let hostelData = {
    name: req.body.name,
    floorCount: req.body.floorCount,
    roomCount: req.body.roomCount,
  };
  let result = await Hostel.findOne({ name: hostelData.name });
  if (!result) {
    // console.log(result);
    return next(new ErrorHandler("hostel not found", 400));
  }
  result = await Hostel.updateOne({ name: hostelData.name }, hostelData);
  if (!result) {
    return next(new ErrorHandler("hostel not updated", 400));
  }

  res.status(200).json({
    success: true,
    message: "hostel updated successfully",
  });
});
exports.insertRooms = catchAsyncErrors(async (req, res, next) => {
  const { hostel, start, end, capacity } = req.body;
  if (!hostel || !start || !end || !capacity) {
    return next(new ErrorHandler("all fields are required", 400));
  }
  let result = await Hostel.findOne({ name: hostel });
  if (!result) {
    return next(new ErrorHandler("hostel not found", 400));
  }

  const insertionPromises = [];

  for (let i = start; i <= end; i++) {
    insertionPromises.push(
      Room.create({
        roomNumber: i,
        capacity: capacity,
        hostel: result._id,
      }),
    );
  }
  const results = await Promise.all(insertionPromises);
  if (!results) {
    return next(new ErrorHandler("rooms not added", 400));
  } else {
    res.status(200).json({
      success: true,
      message: "rooms added successfully",
    });
  }
});
