import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import TopBar from '../TopBar'
import Myquiz from './Myquiz'
import Score from './Score'

const Analysis = () => {
    const [choice,setChoice]=useState(0);
  

    
  return (
   <>
   <TopBar/>
   {/* conditonal rendering here */}
   <Box sx={{bgcolor:'white'}}>
        {/* Choose section */}
        <Box sx={{padding:'1%',display:'flex',justifyContent:'space-around'}}>
            <Button onClick={()=>setChoice(0)} variant="outlined" color="primary">
              MyQuizes
            </Button>
            <Button onClick={()=>setChoice(1)} variant="outlined" color="primary">
               Scores
            </Button>
        </Box>

{/* first part */}
     {
        choice===0?<>
          <Box sx={{bgcolor:'white'}}>
        <Myquiz/>
       </Box>
        </>:""
     }
 
 {/* Second part */}
     {
        choice===1?<>
          <Box sx={{bgcolor:'white'}}>
        <Score/>
       </Box>
        </>:""
     }
   </Box>
   </>
  )
}

export default Analysis
