const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pid: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
      },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

teacherSchema.pre("save", async function (next) {
    try {
      if (!this.isModified("password")) {
        return next();
      }
      // hash paaword
    //   console.log("1");
      const salt = await bcryptjs.genSalt(10);
      const hashPass = await bcryptjs.hash(this.password, salt);
      // console.log(hashPass);
      this.password = hashPass;
      next();
    } catch (error) {
      console.log(error.message);
    }
  });
  
const Teacher = mongoose.model("teacher", teacherSchema);
module.exports = Teacher;
