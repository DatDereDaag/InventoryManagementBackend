const mongoose = require("mongoose");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login_user = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, result) => {
        if (err) throw err;
        return res
          .status(200)
          .json({ message: "Auth successful", token: result });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error logging in user" });
  }
};

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

    return res
      .status(201)
      .json({
        message: "User created successfully",
        result: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          id: newUser._id,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.get_users = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (users.length > 0) {
      res.status(200).json({ length: users.length, users });
    } else {
      res.status(200).json({ message: "No users found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

exports.get_user_by_id = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving user" });
  }
};

exports.delete_user = async (req, res, next) => {
  const userId = req.params.userID;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting user" });
  }
};
