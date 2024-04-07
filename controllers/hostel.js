const Hostel = require("../models/hostel");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandlers");
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
exports.addHostel = catchAsyncErrors(async (req, res, next) => {
  let hostelData = {
    name: req.body.name,
    rooms: req.body.rooms,
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
    rooms: req.body.rooms,
  };

  let result = await Hostel.findOne({ name: hostelData.name });
  if (!result) {
    // console.log(result);
    return next(new ErrorHandler("hostel not found", 400));
  }

  result = await Hostel.findOneAndUpdate(
    { name: hostelData.name },
    { $push: { rooms: { $each: hostelData.rooms } } },
    { upsert: true, runValidators: true, new: true },
  );
  if (!result) {
    return next(new ErrorHandler("hostel not updated", 400));
  }

  res.status(200).json({
    success: true,
    message: "hostel updated successfully",
  });
});

exports.getHostel = catchAsyncErrors(async (req, res, next) => {
  const name = req.params.id;
  let result = await Hostel.findOne({ name: name });
  if (!result) {
    return next(new ErrorHandler("hostel not found", 400));
  }
  res.status(200).json({
    success: true,
    result,
  });
});
exports.bookRoom = catchAsyncErrors(async (req, res, next) => {
  const { studentId, hostelName, roomNumber } = req.body;
  if (!studentId || !hostelName || !roomNumber) {
    return next(new ErrorHandler("all fields are required", 400));
  }
  let hostel = await Hostel.findOne({ name: hostelName });
  if (!hostel) {
    return next(new ErrorHandler("hostel not found", 400));
  }
  let user = await User.findOne({ email: studentId });
  if (!user) {
    return next(new ErrorHandler("user not found", 400));
  }
  // let room = await Hostel.findOne({ "rooms.roomNumber": roomNumber });
  console.log(hostel.rooms);
  const roomIndex = hostel.rooms.findIndex(
    (room) => room.roomNumber === roomNumber,
  );
  // let room = hostel.rooms.find((room) => room.roomNumber === roomNumber);
  if (roomIndex === -1) {
    return next(new ErrorHandler("room not found", 400));
  }
  console.log(roomIndex);
  const room = hostel.rooms[roomIndex];

  console.log(hostel.rooms[roomIndex].occupants);
  if (room.occupants.length >= room.capacity) {
    return res.status(400).json({ error: "Room is already full" });
  }

  const userIndex = room.occupants.findIndex(
    (id) => id.toString() === user._id.toString(),
  );
  if (userIndex !== -1) {
    return res.status(400).json({ error: "User is already in the room" });
  }
  // Add the studentId to the occupants array
  hostel.rooms[roomIndex].occupants.push(user._id);

  console.log(hostel.rooms[roomIndex].occupants);
  user.hostel = hostel._id;
  user.roomNumber = roomNumber;
  await user.save();
  // Save the hostel document
  await hostel.save();
  res.status(200).json({
    success: true,
    message: "room booked successfully",
  });
});

// exports.insertRooms = catchAsyncErrors(async (req, res, next) => {
//   const { hostel, start, end, capacity } = req.body;
//   if (!hostel || !start || !end || !capacity) {
//     return next(new ErrorHandler("all fields are required", 400));
//   }
//   let result = await Hostel.findOne({ name: hostel });
//   if (!result) {
//     return next(new ErrorHandler("hostel not found", 400));
//   }
//
//   const insertionPromises = [];
//
//   for (let i = start; i <= end; i++) {
//     insertionPromises.push(
//       Room.create({
//         roomNumber: i,
//         capacity: capacity,
//         hostel: result._id,
//       }),
//     );
//   }
//   const results = await Promise.all(insertionPromises);
//   if (!results) {
//     return next(new ErrorHandler("rooms not added", 400));
//   } else {
//     res.status(200).json({
//       success: true,
//       message: "rooms added successfully",
//     });
//   }
// });
