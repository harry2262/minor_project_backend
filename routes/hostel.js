const express = require("express");
const { addHostel, updateHostel } = require("../controllers/hostel");
const { routes } = require("../app");
const router = express.Router();

router.route("/addHostel").post(addHostel);
router.route("/updateHostel").patch(updateHostel);
module.exports = router;
