const mongoose = require("mongoose");
const User = require("./user");
const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    validate: {
      validator: async function (value) {
        const room = await mongoose.model("Hostel").findOne({
          "rooms.roomNumber": value,
        });
        return !room; // Return true if room number is unique, false otherwise
      },
      message: (props) =>
        `Room number ${props.value} already exists in this hostel`,
    },
  },
  floor: {
    type: Number,
    default: 1,
  },
  capacity: {
    type: Number,
    default: 1,
  },
  occupants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
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
