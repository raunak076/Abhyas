import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "../styles/styles.module.css"
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import { useCookie } from '../cookie/useCookie';

const TopBar = () => {
  const navigate=useNavigate();
   const {set,get,remove}=useCookie('auth');
   const {name,role}=get();


const logout=()=>{
   remove();
   navigate('/')
}

  return (
   <>
   <Box sx={{
    width:'100%',
    display:'flex',
    padding:'1rem',
   background:'transparent',
   backdropFilter:'blur(20px)'
   }}>
    {/* abhyaas logo--> */}
     <motion.div
     style={{
        width:'60%'
     }}>
     <p style={{textAlign:'center'}} className={`${styles.scrollText} ${styles.imgAnime}`}>Abhyaas</p>
     </motion.div>

     {/* profile and logout div----> */}
     <Box className={styles.profile} sx={{
        width:'20%',
        padding:'1rem',
  
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
     }}>
      {/* profile */}
     <Box className={styles.profile}  sx={{
        width:'70px',
        height:'70px',
        borderRadius:'50%',
        backgroundImage:'url(https://preview.redd.it/shri-krishna-wallpaper-ideas-v0-ga2s68upyyyb1.jpg?width=640&crop=smart&auto=webp&s=820acdda9481e467117de4db72f59954c3a5012c)',
        backgroundSize:'contain',
        cursor:'pointer'
      }}>
       
      </Box>
      <p className={styles.username}>{name}</p>
     </Box>

     {/* logout---> */}
      <Box className={styles.profile} sx={{
        padding:'1rem'
      }}>
    <Button  onClick={logout} variant="text" color="primary">
    <LogoutIcon  sx={{
        width:'70px',
        height:'70px',
        cursor:'pointer'
      }}/>
    </Button>
      </Box>
   </Box>
   </>
  )
}

export default TopBar
