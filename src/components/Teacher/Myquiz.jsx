import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button } from '@mui/material';
import {useQuery} from 'react-query';


const Myquiz = () => {
  const {isLoading,data}= useQuery()
// handle delete function
// const Delete=(row)=>{
//     console.log("Delete item is:",row._id);
//     const id=row._id;
//     axios.delete(`http://localhost:3000/form/${id}`)
//     .then(resp=>{
//      toast.success("Aha ! Deleted", {
//        position: "top-center"}) 
//     })
//     .catch(err=>{
//      toast.error("Something Went Wrong  !", {
//        position: "top-center"})   


//     })
// }
// const data=[
//     {
//         filename:'dsa',
//         createdAt:'20 march 2024'
//     }
// ]

  return (
    <div>
      <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {/* {data.map((row,index) => (
            <TableRow
             key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope ="row">
                {row.filename}
              </TableCell>
              <TableCell >{row.createdAt}</TableCell>
           
              <TableCell >
                <Button  sx={{color:'red'}} variant="text" >
                <DeleteOutlineIcon/>
                </Button>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Myquiz
