const mongoose = require("mongoose");
const Hostel = require("./hostel");
const User = require("./user");
const roomSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Hostel,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  occupants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
});
module.exports = mongoose.model("Room", roomSchema);
