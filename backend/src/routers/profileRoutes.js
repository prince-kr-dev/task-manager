const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/users");

const profileRouter = express.Router();

profileRouter.get("/view", authMiddleware, async (req, res) => {
  try {
    const { _id,fullName, email} = req.user;
    res.status(200).json({ _id, fullName, email });
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

module.exports = profileRouter;