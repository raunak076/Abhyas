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

    studentRoutes.post("/login",async(req,res)=>{
        try {
            const {pid, password} = req.body;
            if (!(password && pid))
                return res.status(201).json({
                status: "failed",
                message: "Please fill all the fields",
            });
            const student = await Student.findOne({ pid })
            if (!student) {
                return res.status(201).json({
                  status: "failed",
                  message: "Invailid credentials",
                });
              }
                res.status(201).json({
                status: "success",
                message: "User successfully loggedin",
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
    studentRoutes.get('/',async(req,res)=>{
        try{
            const details=await Student.find().populate("assignedQuiz.quizid");
            console.log("details are    ",details);
            res.status(200).send(details);
        }catch(e){
            res.status(400).send(e);
        }
    })
    studentRoutes.get('/:pid',async(req,res)=>{
        const pid=req.params.pid;
        try{
            const details=await Student.find({pid});
            console.log("details are    ",details);
            res.status(200).send(details);
        }catch(e){
            res.status(400).send(e);
        }
    })
module.exports = studentRoutes