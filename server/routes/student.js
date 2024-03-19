const express = require("express")
const Student = require("../models/student")

var studentRoutes = express.Router()

studentRoutes.post("/register",async(req,res)=>{
    try {
        const { name, pid, password ,email} = req.body;
        if (!(name && email && password && pid))
            return res.status(201).json({
            status: "failed",
            message: "Please fill all the fields",
        });
        if (await Student.findOne({ email }) || await Student.findOne({ pid })) {
            return res.status(201).json({
              status: "failed",
              message: "User already exists",
            });
          }
          const student = new Student({
            name,
            pid,
            password,
            email
          });
          student.save();
            res.status(201).json({
            status: "success",
            message: "User successfully registered",
            student
            });
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Something went wrong",
                error: error.message,
            })
        }
    })
module.exports = studentRoutes