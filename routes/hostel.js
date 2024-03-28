const express = require("express");
const {
  addHostel,
  updateHostel,
  insertRooms,
} = require("../controllers/hostel");
const { routes } = require("../app");
const router = express.Router();

router.route("/addHostel").post(addHostel);
router.route("/updateHostel").patch(updateHostel);
router.route("/insertRooms").post(insertRooms);
module.exports = router;
