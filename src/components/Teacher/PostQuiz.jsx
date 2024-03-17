import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import { Box } from '@mui/material';
 

const data=[
    {
        name:'dsa',
        due:'20 march 2020'
    },
    {
        name:'dsa',
        due:'20 march 2020'
    },
    {
        name:'dsa',
        due:'20 march 2020'
    }
]

const PostQuiz = () => {
  return (
   <>
     <Box sx={{
      padding:'1%'  ,
      bgcolor:'white',
      height:'100vh'
     }}>
       <h1>Created Quizes</h1>
     <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow
             key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope ="row">
                {row.name}
              </TableCell>
              <TableCell >{row.due}</TableCell>
              <TableCell >
                <Button variant="text" color="success">
                  post
                </Button>
              </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     </Box>
   </>
  )
}

export default PostQuiz
