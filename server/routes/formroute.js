var express = require("express");
var router = express.Router();
const quiz = require("../models/formModel");
const { default: axios } = require("axios");
// const objectSchema = require("../models/quizData");
const userschema = require("../models/quizData");
const mongoose = require("mongoose");
const Teacher = require("../models/teacher");

// getting quiz date -->file name and content
router.post("/", async (req, res) => {
  try {
    const { filename, content, due, pid } = req.body;
    const useradded = await quiz.create({
      filename: filename,
      content: content,
    });
    console.log(req.body);
    const { data } = await axios.post("http://127.0.0.1:5000/get-MCQ", {
      raw_text: content,
      noOfQuestion: 5,
    });
    // console.log(data);
    const { Answer, Option, Question } = data;

    const rndIndArr = [];
    const questions = [];
    if (Answer && Option && Question) {
      for (var i = 0; i < Option.length; i++) {
        const index = Math.floor(Math.random() * 4);
        console.log("Option Before ::", Option[i][index]);
        Option[i][index] = Answer[i];
        console.log("Answer ::", Answer[i]);
        console.log("Option ::", Option[i][index]);

        rndIndArr.push(index);
      }
    }
    // console.log(rndIndArr);
    const rightAnswer = {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
    };
    for (var i = 0; i < Option.length; i++) {
      questions.push({
        question: Question[i],
        A: Option[i][0],
        B: Option[i][1],
        C: Option[i][2],
        D: Option[i][3],
        answer: rightAnswer[rndIndArr[i]],
      });
    }

    // Adding quiz into quiz data
    const results = await userschema.create({
      subname: filename,
      due: due,
      questions,
    });
    console.log("results are::", results);
    console.log("question list :: ", questions);

    // adding quizid to teacher's database for refering myquizes
    //  const teacher=await Teacher.find({
    //   pid:pid,

    //  })

    res.status(201).json(useradded);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" }); // Send a 500 Internal Server Error response
  }
});

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    var formdata = await quiz.find();
    res.status(200).send(formdata);
  } catch (error) {
    console.error(error);
  }
});

// delete file
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await quiz.findByIdAndDelete(req.params.id);
    res.status(200).send(deleted);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
