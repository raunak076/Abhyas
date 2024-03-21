import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button } from '@mui/material';
import { useQueries, useQuery } from 'react-query';
import axios from 'axios';


const fetchScore = () => {
  return axios.get('http://localhost:3000/api/student');
}
const fetchquizes = (id) => {
  return axios.get(`http://localhost:3000/quiz/addquiz/${id}`);
};
const Score = () => {
  const [score,setScore]=useState();
  const [quizid,setQuizid]=useState();
  const { isLoading, data ,isFetching} = useQuery("fetch-studentsScore", fetchScore, {
    onSuccess: (data) => {

      // Filter out the objects where the status is "Attempted"
      var attemptedQuizzes = data.data.map(student => {
        const attemptedQuizzes = student.assignedQuiz.filter(quiz => quiz.status === "Attempted");
        return { ...student, attemptedQuizzes };
      }).filter(student => student.attemptedQuizzes.length > 0);

      // Extract the required fields (name and score) from the filtered quizzes
      var attemptedQuizzesData = attemptedQuizzes.flatMap(student => {
        return student.attemptedQuizzes.map(quiz => ({
          name: student.name,
          score: quiz.score,
          pid: student.pid,
          quizid: quiz.quizid
        }));
      });
     let a=attemptedQuizzesData.map(item=>item.quizid);
    setQuizid(a);
  setScore(attemptedQuizzesData);

      // ends
    }
  });

// dynamic query for all subject names 
const quizResultQueries = quizid ? quizid.map(id => ({
  queryKey: ['quiz-id', id],
  queryFn: () => fetchquizes(id)
})) : [];

const result = useQueries(quizResultQueries);
console.log("Quizes are::",result)

  if (!isLoading) {

    // console.log("data is", data.data)
    // console.log(attemptedQuizzesData);

  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell >pid</TableCell>
              <TableCell >subject</TableCell>
              <TableCell >score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && !isFetching && score.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell >{row.pid}</TableCell>
                <TableCell > {result[index].data && result[index].data.data && result[index].data.data[0] && result[index].data.data[0].subname}</TableCell>
                <TableCell >{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Score
