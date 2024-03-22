const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema({
  question: String,
  A: String,
  B: String,
  C: String,
  D: String,
  answer: String,
});

const userschema = new mongoose.Schema(
  {
    subname: {
      type: String,
      required: true,
      unique: false,
    },
    due: {
      type: String,
      required: true,
    },
    questions: [objectSchema],
    posted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const quiz = mongoose.model("quizdata", userschema);
// const form = mongoose.model("form", objectSchema);
module.exports = quiz;
// module.exports = form;
