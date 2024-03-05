const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  roomCount: Number,
  floorCount: Number,
});

module.exports = mongoose.model("Hostel", hostelSchema);
