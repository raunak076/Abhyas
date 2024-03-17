import * as React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import styles from '../styles/styles.module.css'
import Button from '@mui/material/Button'

export default function HeroSection() {
  const alignCenter = { display: 'flex', alignItems: 'center' }
  return (
    <div>
      <div className={`${styles.background} ${styles.imgAnime}`} />

      <Parallax pages={5}>
        <ParallaxLayer  offset={0} speed={0.5} style={{  justifyContent: 'center' }}>
          <p style={{textAlign:'center'}} className={`${styles.scrollText} ${styles.imgAnime}`}>Abhyaas</p>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 1, end: 3 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
          <div className={` ${styles.sticky}`}>
          <Button className={styles.btn} variant="outlined" color='success' sx={{
                background:'transparent',
                color:'white',
                backdropFilter:'blur(40px)',
            
          }} >
            Login
          </Button> 
          </div>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 2, end: 3 }} offset={1.5} speed={1.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={` ${styles.parallax}`}>
          <Button  className={styles.btn} variant="outlined" sx={{
                background:'transparent',
                color:'white',
                backdropFilter:'blur(40px)'
          }} >
            Register
          </Button> 
          </div>
        </ParallaxLayer>

        <ParallaxLayer  sticky={{ start: 2, end: 3 }} offset={2.5} speed={1.5} style={{ ...alignCenter, justifyContent: 'center' }}>
        <div className={` ${styles.parallax}`}>
          <Button  className={styles.btn} variant="outlined" sx={{
                background:'transparent',
                color:'white',
                backdropFilter:'blur(40px)'
          }} >
            About
          </Button> 
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}
