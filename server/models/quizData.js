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
      unique: true,
    },
    due: {
      type: String,
      unique: true,
      required: true,
    },
    questions: [objectSchema],
  },
  { timestamps: true }
);

const quiz = mongoose.model("quizdata", userschema);
module.exports = quiz;
