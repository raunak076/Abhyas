var express = require('express');
var router = express.Router();
const quizdata=require("../models/studentFormData");
const addquiz=require("../models/quizData");

router.get('/',async(req,res)=>{
   try{
    const details=await quizdata.find();
    res.send(details);
   }catch(err){
          res.send("Error in loading");
          console.log(err);
   }

    
})

// post req by teacher when creating a quiz and generating a quiz 
router.post('/addquiz',async(req,res)=>{
    try{
        const {subname,due,questions}=req.body;
        const result=await addquiz.create({
            subname:subname,
            due:due,
            questions:questions
        });
    res.status(200).send(result)
    }catch(e){
        res.status(400).send(e)
    }
})

// get data from add quiz
router.get('/addquiz',async(req,res)=>{
    try{
       
        const details=await addquiz.find();
        res.send(details);
       }catch(err){
              res.send("Error in loading");
              console.log(err);
       }
    
})

//get data by id
router.get('/addquiz/:id',async(req,res)=>{
    const id=req.params.id;
    console.log("id is:",id);
    try{
      
        const details=await addquiz.find({
            _id:id
        });
        res.status(200).send(details);
       }catch(err){
              res.status(404).send("Error pls check ");
              console.log(err);
       }
    
})

// 
router.post('/addquiz',async(req,res)=>{
    try{
        const {id}=req.body;
        const details=await addquiz.findOne(
            {
                _id:id
            }
        );
        res.send(details);
       }catch(err){
              res.send("Error in loading");
              console.log(err);
       }
    
})


// post req when submitting form by student
router.post('/',async(req,res)=>{
    try{
        const {name,pid,subj,status,score}=req.body;
        const result=await quizdata.create({
          name:name,
          pid:pid,
          subj:subj,
          status:status,
          score:score
        })
     res.status(200).send(result);
    }catch(e){
        res.status(400).send(e); 
        console.log(e)
    }
})

module.exports=router;