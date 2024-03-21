import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuizImage from '../assets/bg.png';
import styles from '../styles/styles.module.css';
import { useCookie } from '../cookie/useCookie';

const HeroSection = () => {
const {set}=useCookie('isLog');

useEffect(()=>{
   set(false)
},[])

  return (
    <Container >
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.2 }}
        style={{ width: '70%' }}
      >
        <p style={{ textAlign: 'center' }} className={`${styles.scrollText} ${styles.imgAnime}`}>
          Abhyaas
        </p>
      </motion.div>
      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ minHeight: '60vh' }}>
        <Grid item xs={12} md={6} align="center">
          <h1 className={styles.text}  >Welcome to Quiz Generator</h1>
          <Typography variant="body1" gutterBottom>Create and manage quizzes with ease!</Typography>
          <Box mt={4}>
            <Button variant="contained" color="primary" component={Link} to="/login" style={{ marginRight: '10px' }}>
              Login
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/register">
              Register
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} align="center">
          <img src={QuizImage} alt="Quiz" style={{ maxWidth: '100%', height: 'auto' }} />
        </Grid>
      </Grid>

      <Box sx={{
        bgcolor:'#bde0fe',
      }} mt={8}>
        <Divider />
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '40px' }}>
          Why Choose Quiz Generator?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4} align="center">
            <Typography variant="h6" gutterBottom>Easy to Use</Typography>
            <Typography variant="body2">Create, manage, and take quizzes with a user-friendly interface.</Typography>
          </Grid>
          <Grid item xs={12} md={4} align="center">
            <Typography variant="h6" gutterBottom>Customizable</Typography>
            <Typography variant="body2">Customize quiz questions, answers, and settings to fit your needs.</Typography>
          </Grid>
          <Grid item xs={12} md={4} align="center">
            <Typography variant="h6" gutterBottom>Secure</Typography>
            <Typography variant="body2">Your data is encrypted and protected with state-of-the-art security measures.</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HeroSection;
