const mongoose = require("mongoose");
const User = require("./user");
const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  floor: {
    type: Number,
    default: 1,
  },
  capacity: {
    type: Number,
    default: 1,
  },
  occupants: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
});
const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  rooms: [roomSchema],
});
module.exports = mongoose.model("Hostel", hostelSchema);
