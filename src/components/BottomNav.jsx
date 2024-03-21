import { Box, Card, Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCookie } from '../cookie/useCookie';



const BottomNav = () => {
  const {get,set,remove}=useCookie('auth');
  const navigate=useNavigate();

  const logout=()=>{
    remove();
   navigate('/');
  }
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
            <Button variant="text" color="primary">
            <HomeIcon sx={{ color: 'black' }} />
            </Button>
          </Link>
        </Box>
        <Box sx={{
          overflow: 'hidden'
        }}>
         <Button onClick={()=>navigate('/dashboard/about')} variant="text" color="primary">
         <InfoIcon sx={{ color: 'black' }} />
         </Button>
        </Box>
        <Box sx={{
          overflow: 'hidden'
        }}>
        
           <Button onClick={logout} variant="text" color="primary">
           <LogoutIcon sx={{ color: 'red' }} />
           </Button>
        
        </Box>
        
      </Card>
    </>
  )
}

export default BottomNav
