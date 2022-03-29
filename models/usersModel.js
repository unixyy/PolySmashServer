const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    score: {
      type: Number,
      required: false,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    passwordRepeat: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamp: true }
);

const users = mongoose.model("users", userSchema);

module.exports = users;
