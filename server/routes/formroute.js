var express = require("express");
var router = express.Router();
const quiz = require("../models/formModel");
const { default: axios } = require("axios");

// getting quiz date -->file name and content
router.post("/", async (req, res) => {
  try {
    const { filename, content } = req.body;
    const useradded = await quiz.create({
      filename: filename,
      content: content,
    });
    console.log(req.body);
    const data = await axios.post("http://127.0.0.1:5000/get-MCQ", {
      raw_text: content,
      noOfQuestion: 5,
    });
    // console.log(req.body);
    console.log(data);
    // const mcq = await fetch("http://192.168.0.103:5000/get-MCQ", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ raw_text: content, noOfQuestion: 5 }),
    // });
    // console.log(mcq);
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
