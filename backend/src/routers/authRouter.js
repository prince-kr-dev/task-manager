const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email: " + email,
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Enter Strong password: " + password + " || " + "Try: Example@$#123",
      });
    }

    const saltRound = parseInt(process.env.SALT_ROUND);
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const payload = { id: newUser._id, email: newUser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User added successfully",
      info: newUser,
    });
  } catch (err) {
    res.status(400).json({ message: "Something wend wrong" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required!",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (isMatchedPassword) {
      const safeUserData = await User.findOne({ email }).select("-password");

      const payload = { id: user._id, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, 
      });

      res.status(200).json({
        message: "Logged in successfully",
        info: safeUserData,
      });
    } else {
      res.status(400).json({
        message: "Incorrect password",
      });
    }
  } catch (err) {
    res.status(400).json({ message: "Something wend wrong" });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .send("User Logged out successfully");
  } catch (err) {
    res.status(400).json({ message: "Something wend wrong" });
  }
});

module.exports = authRouter;