const mongoose = require("mongoose");
const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    pid: {
      type: String,
      unique: true,
      required: true,
    },
    subj: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    score: {
      type: String,
      required: "true",
      default: "null",
    },
  },
  { timestamps: true }
);

const studentdata = mongoose.model("studentformdata", userschema);
module.exports = studentdata;
