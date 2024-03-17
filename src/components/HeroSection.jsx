import * as React from 'react'
import styles from '../styles/styles.module.css'
import { Box, Button } from '@mui/material'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';




const Head=styled.div({
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'start',
  width:'30%',
  gap:'1rem',
  padding:'1rem',
  '@media (max-width:600px)':{
    flexDirection:'column',
    overflow:'hidden'
  }
});

const Headcont=styled.div({
  display:'flex',
  justifyContent:'space-evenly',
  width:'100vw',
  '@media (max-width:600px)':{
       flexDirection:'column-reverse',
       justifyContent:'center',
       alignItems:'center',
       overflow:'hidden'
  }
});

export default function HeroSection() {
 
  return (
    <div>
       <div className={`${styles.background} ${styles.imgAnime}`} />
         <Headcont>
          <Head >
           <Link to="/login">
           <Button sx={{
            width:'30%'
           }} variant="outlined" color="success">
              Signin
            </Button>
           </Link>
          <Link to="/register">
          <Button sx={{
            width:'30%'
           }} variant="outlined" color="success">
              Signup
            </Button>
          </Link>
          <Link to="/dashboard">
          <Button sx={{
            width:'30%'
           }} variant="outlined" color="success">
              Dash
            </Button>
          </Link>
          </Head>
            <motion.div 
            initial={{width:'0%'}}
            animate={{width:'100%'}}
            transition={{duration:.2 }}
            style={{
              width:"70%"
            }}>
            <p style={{textAlign:'center'}} className={`${styles.scrollText} ${styles.imgAnime}`}>Abhyaas</p>
            </motion.div>
         </Headcont>
       </div>
  )
}
