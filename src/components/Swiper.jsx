import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Box } from '@mui/material';
import step11 from "../assets/step11.png"
import step22 from "../assets/step22.png"
import step3 from "../assets/step3.png"


const HeroSwipe = () => {
    return (
      
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                bgcolor:'red',
            }}>
                <>
                    <Box sx={{
                        backgroundImage: `url(${step11})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        width:'100vw',
                        height:'100px'
                    }}>

                    </Box>
                </>
                <> <Box sx={{
                    backgroundImage: `url(${step22})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height:'100px'
                }}>

                </Box>
                </>
                <>
                    <Box sx={{
                        backgroundImage: `url(${step3})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        height:'100px'
                    }}>

                    </Box>
                </>

            </Box>
     
    )
}

export default HeroSwipe;
