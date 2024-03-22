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
import { useQueries, useQuery } from 'react-query';
import useAuth from '../hooks/useAuth';
import { useCookie } from '../cookie/useCookie';


const fetchStudent = (pid) => {
  return axios.get(`http://localhost:3000/api/student/${pid}`);
};

const fetchquizes = (id) => {
  return axios.get(`http://localhost:3000/quiz/addquiz/${id}`);
};

const ChooseQuiz = () => {
  const navigate = useNavigate();
  const { set } = useCookie('quizid');
  const { get } = useCookie('auth');
  const [quizid, setQuizid] = useState();

  // Fetching students for getting pending quizzes
  const { isLoading, data, isError, error } = useQuery('choose-quiz', () => fetchStudent(get().pid), {
    onSuccess: (data) => {
     try{
      
        const fetchedQuizId = data?.data[0]?.assignedQuiz.map(item => item.quizid);
        setQuizid(fetchedQuizId);
      
     }catch(e){
      console.log("Assigned null",e)
     }
    
    }
  });

  // useEffect to execute queries based on quizid
  const quizResultQueries = quizid ? quizid.map(id => ({
    queryKey: ['quiz-id', id],
    queryFn: () => fetchquizes(id)
  })) : [];

  const result = useQueries(quizResultQueries);
  
// console.log("Student data is::",data?.data[0].assignedQuiz)


  if (isLoading) {
    return (
      <Card>
        <h1>Loading...</h1>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <h1>Error in Fetching data from database.</h1>
      </Card>
    );
  }

  const handlequiz = (id) => {
    set(id);
    console.log("id is:",id)
    navigate('/dashboard/attempt');
  };

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
                
                </TableRow>
              </TableHead>
              <TableBody>
              {result && result.map((row, index) => (
  <TableRow
    key={index}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {row.data && row.data.data && row.data.data[0] && row.data.data[0].subname}
    </TableCell>
    <TableCell>  {row.data && row.data.data && row.data.data[0] && row.data.data[0].due}</TableCell>
    <TableCell>
      <Button onClick={() => { handlequiz(row.data.data[0]._id) }} variant="contained" color="success">
      {data?.data[0].assignedQuiz[index].status}
      </Button>
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
};

export default ChooseQuiz;
