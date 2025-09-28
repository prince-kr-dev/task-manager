const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName:{
      type:String,
      minlength:4,
      maxlength:30,
      default:"User7456"
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password: " + value);
        }
      },
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;