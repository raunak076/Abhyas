var express = require('express');
var router = express.Router();
const quiz=require('../models/formModel')


// getting quiz date -->file name and content
router.post('/',async(req,res)=>{
    try{
   const {filename,content}=req.body;

    const useradded=await quiz.create({
      filename:filename,
      content:content
    }); 
    res.status(201).json(useradded);
    } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Server error" }); // Send a 500 Internal Server Error response
 }
 
 });


/* GET users listing. */
router.get('/', async(req,res)=>{
   try{
         var formdata=await quiz.find();
         res.status(200).send(formdata);
   }catch(error){
    console.error(error);
   }
});

// delete file
router.delete('/:id',async(req,res)=>{
    try{
      const deleted=await quiz.findByIdAndDelete(req.params.id);
      res.status(200).send(deleted);
    }catch(error){
      res.status(500).json({ error: "Server error" });
    }
})



module.exports = router;