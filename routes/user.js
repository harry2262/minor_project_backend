const express = require("express");
const router = express.Router();

// const Subject = require("../models/subject");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getFilteredUsers,
  logout,
  // bookRoom,
  // sendEmail,
} = require("../controllers/user");

const { isAuthenticatedUser } = require("../middleWares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
// router.route("/filtered-users").post(isAuthenticatedUser, getFilteredUsers);
// router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router.route("/logout").get(logout);
router.route("/test").get(async (req, res) => {
  // const newsubject = await subject.create({
  //   dsapages: [],
  //   languagepages: [],
  //   csfundamentalspages: [],
  //   projectpages: [],
  // });
  res.status(200).json({
    success: true,
    message:
      "Welcome to the API, this is test route, Server running successfully !!",
  });
});
// router.route("/bookRoom").post(bookRoom);
// router.route("/sendEmail").post(sendEmail);
module.exports = router;
