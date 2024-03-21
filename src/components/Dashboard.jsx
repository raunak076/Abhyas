import { Box } from '@mui/material'
import React from 'react'
import Side from './Side'
import { styled } from 'styled-components'
import TopBar from './TopBar';
import Mid from './Mid';
import style from "../styles/styles.module.css"
import BottomNav from './BottomNav';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import MyForm from './MyForm';
import AttemptTest from './AttemptTest';
import ChooseQuiz from './ChooseQuiz';
import PostQuiz from './Teacher/PostQuiz';
import ViewScore from './ViewScore';

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
      {/* <Route path="/" element={<MyForm />} /> */}
      <Route path='/attempt' element={<AttemptTest/>} />
      <Route path='/choosetest' element={<ChooseQuiz/>} />
      <Route path='/viewscore' element={<ViewScore/>} />
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