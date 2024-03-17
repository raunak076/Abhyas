import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TopBar from './TopBar';
import { useQuery } from 'react-query';
import useAuth from '../hooks/useAuth';



const fetchQuiz=()=>{
   return  axios.get('http://localhost:3000/quiz/addquiz');
}

const ChooseQuiz = () => {
  const navigate = useNavigate();
 const {quizid,setId}=useAuth();
 const {isLoading,data,isError,error} =useQuery(
    'choose-quiz',
     fetchQuiz,
     {

     }
  )
  if(isLoading){
    return <>
    <Card>
      <h1>Loading...</h1>
    </Card>
    </>
   }
  

 if(isError){
  return <>
  <Card>
    <h1>Error in Fetching data from database.</h1>
  </Card>
  </>
 }

 const handlequiz=(id)=>{
  setId({id});
  navigate('/dashboard/attempt')
 }

  return (
    <>
      <TopBar />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Box sx={{
          width: '70%',
          mt: '2%'
        }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.subname}
                    </TableCell>
                    <TableCell>{row.due}</TableCell>
                    <TableCell>
                      <Button onClick={() => { handlequiz(row._id) }} variant="contained" color="success">
                        Pending
                      </Button>
                    </TableCell>
                    <TableCell>
                      NULL
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default ChooseQuiz;
