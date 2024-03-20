const express = require("express")
const Teacher = require("../models/teacher")

var teacherRoutes = express.Router()

teacherRoutes.post("/register",async(req,res)=>{
    try {
        const { name, pid, password ,email} = req.body;
        if (!(name && email && password && pid))
            return res.status(201).json({
            status: "failed",
            message: "Please fill all the fields",
        });
        if (await Teacher.findOne({ email }) || await Teacher.findOne({ pid })) {
            return res.status(201).json({
              status: "failed",
              message: "User already exists",
            });
          }
          const teacher = new Teacher({
            name,
            pid,
            password,
            email
          });
          teacher.save();
          console.log(teacher)
            res.status(201).json({
            status: "success",
            message: "User successfully registered",
            teacher
            });
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Something went wrong",
                error: error.message,
            })
        }
    })

    teacherRoutes.post("/login",async(req,res)=>{
        try {
            const {pid, password} = req.body;
            if (!(password && pid))
                return res.status(201).json({
                status: "failed",
                message: "Please fill all the fields",
            });
            const teacher = await Teacher.findOne({ pid })
            if (!teacher) {
                return res.status(201).json({
                  status: "failed",
                  message: "Invailid credentials",
                });
              }
                res.status(201).json({
                status: "success",
                message: "User successfully loggedin",
                teacher
                });
            } catch (error) {
                return res.status(500).json({
                    status: "failed",
                    message: "Something went wrong",
                    error: error.message,
                })
            }
        })

        teacherRoutes.get('/',async(req,res)=>{
            try{
                const details=await Teacher.find();
                res.status(200).send(details);
            }catch(e){
                res.status(400).send(e);
                console.log("error in getting ")
            }
        })
module.exports = teacherRoutes