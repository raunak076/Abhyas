import { Box, Button, Tooltip } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Link } from 'react-router-dom';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { motion } from "framer-motion"


const Sidebar = () => {
  return (
   <>
  <motion.div
  initial={{width:'0%'}}
  animate={{width:'100%'}}
  transition={{duration:1}}
  >
     <Box sx={{
    width:'100%',
    height:'80vh',
    background:'transparent',
    backdropFilter:'blur(10px)',
    borderRadius:'1rem',
    padding:'20% 20%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    gap:'15%'
   }}>
        <Box sx={{
            overflow:'hidden'
        }}>
            <Link to={'/teacher'}>
            <Tooltip title="home" placement="right-end">
            <HomeIcon sx={{color:'#f48c06'}}/>
            </Tooltip>
            </Link>    
        </Box>
        <Box sx={{
            overflow:'hidden'
        }}>
              <Link to={'/teacher/analysis'}>
              <Tooltip  title="Analysis" placement="right-end">
              <QueryStatsIcon sx={{color:'#f48c06'}}/>
              </Tooltip>
              </Link>
        </Box>
      
        <Box sx={{
            overflow:'hidden'
        }}>
           <Tooltip title="About" placement="right-end">
               <InfoIcon sx={{color:'#f48c06'}}/>
               </Tooltip>
        </Box>
   </Box>
  </motion.div>
   </>
  )
}

export default Sidebar
