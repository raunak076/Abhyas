import { Box } from '@mui/material'
import React from 'react'
import Side from '../Side'
import { styled } from 'styled-components'
import style from "../../styles/styles.module.css"
import BottomNav from '../BottomNav';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import PostQuiz from './PostQuiz'



const Left=styled.div({
    width:'5%',
    // backgroundColor:'white',
    padding:'2rem 1rem',
    '@media (max-width:1200px)':{
      width:'10%'
    },
    '@media (max-width:600px)':{
        display:'none'
      }
});

const Right=styled.div({
    width:'95%',
    overflowY:'scroll',
    '@media (max-width:1200px)':{
        width:'90%'
      },
    // backgroundColor:'white',
    '@media (max-width:600px)':{
        width:'100%'
      },
   
});

const Dashboard = () => {
  return (
   <>
   <Box className={style.dash} sx={{
    width:'100vw',
    height:'100vh',
    display:'flex',
  overflow:'hidden',
  // bgcolor:'#3a86ff'
   }}>
    {/* left side */} 
   <Left >
      <Side/>
   </Left>

   {/* right side */}
    <Right>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/postquiz' element={<PostQuiz/>} />
  
     </Routes>
       <Box className={style.bottom} sx={{
        position:'absolute',
        bottom:0,
        width:'100vw'
       }}>
       <BottomNav/>
       </Box>
    </Right>
   </Box>
 
   </>
  )
}

export default Dashboard