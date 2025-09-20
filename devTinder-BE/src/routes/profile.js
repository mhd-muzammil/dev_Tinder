const express = require("express");
const profileRouter = express.Router();
const User = require('../models/user');
const { userAuth } = require("../middlewares/Auth");
const { validateEditProfileData } = require("../utils/validation");

const bcrypt = require("bcrypt");
const { validate } = require("../models/user");
const validator = require('validator');

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    console.log(loggedInUser);

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/updatePassword", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(404).send("All Fields are Required");
    }
    if (newPassword !== confirmPassword) {
      res.status(404).send("New Password doesn't match Confirm Password");
    }
    const loggedInUser = req.user;
      const passHash = loggedInUser.password;
      console.log(passHash);
    const isMatch = await bcrypt.compare(oldPassword, passHash);
    if (!isMatch) {
      res.status(404).send("Old Password is Incorrect");
    }
    if (!validator.isStrongPassword(newPassword)) {
      res.status(400).send("Please enter a strong password!");
    }
    loggedInUser.password = await bcrypt.hash(newPassword, 10);
      await loggedInUser.save();
      let updatedPass = loggedInUser.password
    res.send({
      messsage: `${loggedInUser.firstName} Password updated succesfully`,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
