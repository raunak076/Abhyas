var express = require("express");
var router = express.Router();
const quizdata = require("../models/studentFormData");
const addquiz = require("../models/quizData");
const student = require("../models/student");
const Student = require("../models/student");

router.get("/", async (req, res) => {
  try {
    const details = await quizdata.find();
    res.send(details);
  } catch (err) {
    res.send("Error in loading");
    console.log(err);
  }
});

// post req by teacher when creating a quiz and generating a quiz
router.post("/addquiz", async (req, res) => {
  try {
    const { subname, due, questions } = req.body;
    const result = await addquiz.create({
      subname: subname,
      due: due,
      questions: questions,
    });
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

// put req when posting quiz to students
router.put("/postquiz", async (req, res) => {
  const { _id } = req.body;
  try {
    const update = await addquiz.findByIdAndUpdate(
      _id,
      { $set: { posted: true } },
      { new: true }
    );
    //  also handle for students ->add these quizes to students database in pending state
    const std = await student.updateMany(
      { yearbranch: "teit" },
      { $push: { assignedQuiz: [{ quizid: _id, status: "pending" }] } }
    );
    res.status(200).send(std);
  } catch (e) {
    res.status(400).send(e);
  }
});

// get data from add quiz to teachers
router.get("/addquiz/teacher", async (req, res) => {
  try {
    const details = await addquiz.find({
      posted: false,
    });
    res.send(details);
  } catch (err) {
    res.send("Error in loading");
    console.log(err);
  }
});

// get data for students
router.get("/addquiz/student", async (req, res) => {
  try {
    const details = await addquiz.find({
      posted: true,
    });
    res.send(details);
  } catch (err) {
    res.send("Error in loading");
    console.log(err);
  }
});

// get data all quizes data
router.get("/addquiz", async (req, res) => {
  try {
    const details = await addquiz.find();
    res.send(details);
  } catch (err) {
    res.send("Error in loading");
    console.log(err);
  }
});

//get data by id for students
router.get("/addquiz/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Working:", id);
  try {
    const details = await addquiz.find({
      _id: id,
    });
    console.log("quiz details are", details);
    res.status(200).send(details);
  } catch (err) {
    res.status(404).send("Error pls check ");
    console.log(err);
  }
});

// delete
router.delete("/addquiz/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const details = await addquiz.deleteOne({
      _id: id,
    });

    // dleeting students data
    const result = await Student.updateMany(
      {},
      { $pull: { assignedQuiz: { quizid: id } } } // Remove all occurrences of the quiz ID from assignedQuiz
    );

    res.status(200).send(details);
  } catch (e) {
    res.status(400).send(e);
  }
});

//
router.post("/addquiz", async (req, res) => {
  try {
    const { id } = req.body;
    const details = await addquiz.findOne({
      _id: id,
    });
    res.send(details);
  } catch (err) {
    res.send("Error in loading");
    console.log(err);
  }
});

// post req when submitting form by student
router.post("/", async (req, res) => {
  try {
    const { name, pid, subj, status, score } = req.body;
    const result = await quizdata.create({
      name: name,
      pid: pid,
      subj: subj,
      status: status,
      score: score,
    });
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

module.exports = router;

// {
//     "subname":"DSA",
//     "due":"20 march",
//     "questions":[
//       ]
//   }
