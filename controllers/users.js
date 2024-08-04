const mongoose = require("mongoose");
const User = require("../models/users");
//const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login_user = async (req, res, next) => {};

exports.register_user = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    try {
      await newUser.save();
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    res
      .status(201)
      .json({ message: "User created successfully", result: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.get_users = async (req, res, next) => {};

exports.get_user_by_id = async (req, res, next) => {};

exports.delete_user = async (req, res, next) => {
  const userId = req.params.userID;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting user" });
  }
};
