const express = require("express");
const {
  addHostel,
  updateHostel,
  getHostel,
  // insertRooms,
} = require("../controllers/hostel");
const { routes } = require("../app");
const router = express.Router();

router.route("/addHostel").post(addHostel);
router.route("/updateHostel").patch(updateHostel);
router.route("/:id").get(getHostel);
module.exports = router;
