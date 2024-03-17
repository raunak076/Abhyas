const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      unique: false,
    },
    content: {
      type: String,
      unique: false,
      required: true,
    },
  },
  { timestamps: true }
);

const file = mongoose.model("form", userschema);
module.exports = file;
