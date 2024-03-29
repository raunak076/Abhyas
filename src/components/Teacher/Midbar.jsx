import { Box, Card, Button } from '@mui/material'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import style from "../../styles/styles.module.css"
import QuizForm from '../QuizForm';
import { useNavigate } from 'react-router-dom';



const MidContainer=styled.div({
    background:'transparent',
    backdropFilter:'blur(120px)',
       display:'flex',
       justifyContent:'space-evenly',
       alignItems:'center',
       padding:'10%',
       '@media (max-width:600px)':{
        flexDirection:'column',
        width:'100vw'
       }
})

const Midbar = () => {
  const [pop,setPop]=useState(false);
  const navigate = useNavigate();

  return (
  <>
  {/* render pop up conditionally */}
  {
    pop?<QuizForm pop={pop} setPop={setPop} />:""
  }
  <MidContainer className={style.mid}>

    {/* first card */}
  <Card className={style.mid} sx={{
        padding:'1%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        gap:'10px',
        backdropFilter:'blur(20px)',
        background:'transparent'
       }}>
        <div style={{fontWeight:'700',fontSize:'2rem'}}>Generate Quiz</div>
        <Button onClick={()=>{setPop(true)}} sx={{
          borderRadius:'50%',
          height:'50px',
          width:'50px',
          color:'#fb8500'
        }} variant="text" >
         <AddCircleIcon sx={{width:'100%',height:'100%'}}/>
        </Button>
       </Card>

       {/* second card */}
       <Card className={style.mid} sx={{
        padding:'1%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        gap:'10px',
        backdropFilter:'blur(20px)',
        background:'transparent'
       }}>
        <div style={{fontWeight:'700',fontSize:'2rem'}}>Post Quiz</div>
        <Button sx={{
          borderRadius:'50%',
          height:'50px',
          width:'50px', 
          color:'#70e000' 
        }} onClick={()=>{navigate('/teacher/postquiz')}} variant="text" >
         <NoteAltOutlinedIcon sx={{width:'100%',height:'100%'}}/>
        </Button>
       </Card>
  </MidContainer>
  </>
  )
}

export default Midbar
