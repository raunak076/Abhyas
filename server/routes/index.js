var express = require("express");
var router = express.Router();
const user = require("../models/userModel");
const bcrypt = require("bcryptjs");

const salt = 10;



// registeration
router.post("/", (req, res) => {
  try {
    const { name, pid, pass ,role} = req.body;
    //   hashing here
    bcrypt.hash(pass, salt, async (err, hash) => {
      if (err) {
        console.log("Error in hashing-->", err);
      }
      const useradded = await user.create({
        name: name,
        pid: pid,
        pass: hash,
        role:role
      });
      res.status(201).json(useradded);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" }); // Send a 500 Internal Server Error response
  }
});

router.get("/", async (req, res) => {
  try {
    const details = await user.find();
    res.status(200).json(details);
  } catch (error) {
    console.error(error);
  }
});

// get userby name and pass
router.post("/login", async (req, res) => {
  const { name, pass } = req.body;

  try {
    const details = await user.findOne({
      name: name,
    });

    console.log("details", details);
    //   check login pass
    const hashpass = details.pass;

    if (details !== null) {
      // check here
      bcrypt.compare(pass, hashpass, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404``).json({ error: error.message });
        } else {
          console.log(result);
          res.status(200).json(details);
        }
      });

      console.log("user found", details.pass);
    } else {
      console.log("User not found !");
      res.status(400).json({ error: error.message });
    }
    ``;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
