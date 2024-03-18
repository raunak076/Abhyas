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
    pass: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const user = mongoose.model("user", userschema);
module.exports = user;
