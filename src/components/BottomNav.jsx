import { Box, Card } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import QueryStatsIcon from '@mui/icons-material/QueryStats';


const BottomNav = () => {
  return (
    <>
      <Card  sx={{
        display:'flex',
        width:'100%',
       justifyContent:'space-evenly',
       padding:'5% 0px'
      }}>
        <Box sx={{
          overflow: 'hidden'
        }}>
          <Link to={'/dashboard'}>
            <HomeIcon sx={{ color: 'black' }} />
          </Link>
        </Box>
        <Box sx={{
          overflow: 'hidden'
        }}>
          <Link to={'/dashboard/myform'}>
            <QueryStatsIcon sx={{ color: 'black' }} />
          </Link>
        </Box>
        
        <Box sx={{
          overflow: 'hidden'
        }}>
          <InfoIcon sx={{ color: 'black' }} />
        </Box>
      </Card>
    </>
  )
}

export default BottomNav
