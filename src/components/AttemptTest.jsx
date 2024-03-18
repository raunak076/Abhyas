import React from 'react'
import TopBar from './TopBar'
import { Box, Card, Button, Stack } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import  {  useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';
import useAuth from "../hooks/useAuth"
import { useCookie } from '../cookie/useCookie';


const fetchquiz=(id)=>{
   return axios.get(`http://localhost:3000/quiz/addquiz/${id}`)
}

const AttemptTest = () => {
    const [ans,setAns]=useState([]);
    const {get}=useCookie('quizid')
    const navigate=useNavigate();
    const {auth}=useAuth();
  const {isLoading,isError,error,data} =  useQuery(
        'fetching-questions',
        ()=>fetchquiz(get())
    )
    var mydata;
    if(!isLoading){
         mydata=data.data[0];
        console.log("quiz id is:",get(),"data is",mydata.questions[0].question)
        mydata.questions.forEach((question, index) => {
            console.log(`Question ${index + 1}: ${question.question}`);
        });
      
    }
  

   
  
    // log ans
useEffect(()=>{
   console.log(ans)
},[ans])


// handle ans slection
const handleAns=(index,value)=>{
    const updatedAnswers = [...ans];
    updatedAnswers[index] = { index, value };
    setAns(updatedAnswers);
}



// handle submit
const submit=(e)=>{
            e.preventDefault();
  
    console.log("working lenght is"+ans.length)
    let allQuestionsAnswered = true;
    if(ans.length!==mydata.questions.length){
        console.log("Some fields are missing!!");
        
        toast.error("Fill the form completely  !", {
            position: "top-center"
          });
     allQuestionsAnswered=false;
    }

    // check for undefine
    ans.forEach((answer, index) => {
       try{
        if (typeof answer === 'undefined') {
            allQuestionsAnswered = false;
            // You can display a message indicating that all questions must be answered
            console.log(`Please answer question ${index + 1}.`);
            toast.error(`Please answer question ${index + 1}.`, {
                position: "top-center"
              });
            allQuestionsAnswered=false;
        }
       }catch(e){
   console.log("error in check undfine")
       }
    });


    // condtion
     if(allQuestionsAnswered){
        var c=0;
        ans.forEach(answer => {
            const { index, value } = answer;
            if (value === mydata.questions[index].answer) {
                c++;
            }
        });
        console.log("corrected ans is:" + c);
        
        toast.success("Submitted  ! Score="+c, {
            position: "top-center"
          });
     }
   const name=auth.name;
   console.log(name,auth.pid,mydata.subname)
     axios.post('http://localhost:3000/quiz/',{
         name:name,
         pid:auth.pid,
         subj:mydata.subname,
         status:"Attempted",
         score:c.toString(),
        
     }).then((res)=>{
            console.log("Inserted successfully")
     }).catch((e)=>{
        console.log("error in insertions ")
     })
}

  return (
   <>
   <TopBar/>


   <Card sx={{
    display:'flex',
    justifyContent:'center',
    padding:'1%'
  }}>
  <form onSubmit={submit}>
    
  {
   mydata?.questions.map((question, index) => {
     return(
        <div key={index}>
        {/* Question Section */}
        <div style={{textAlign:'left'}}>
            <p style={{fontWeight:'900'}}>Q.{index + 1} {question.question}</p>
        </div>
        {/* Options */}
        <RadioGroup
            aria-labelledby={`question-label-${index}`}
            defaultValue=""
            name={`radio-buttons-group-${index}`}
            onChange={(e) => handleAns(index, e.target.value)}
        >
            <FormControlLabel value='A' control={<Radio />} label={question.A} required />
            <FormControlLabel value='B' control={<Radio />} label={question.B} required />
            <FormControlLabel value='C' control={<Radio />} label={question.C} required />
            <FormControlLabel value='D' control={<Radio />} label={question.D} required />
        </RadioGroup>
    </div>
     )
    })
   
    
}

      
       
 
    <Button sx={{
             width:'100px',
             height:'50px',
             m:'100px 0'
        }} type='submit' variant="contained" color="primary">
          Submit
        </Button>
    </form>
  </Card>


  {/* toast msg */}
  <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
        />
   </>
  )
}

export default AttemptTest


