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

const Score = () => {

    const data=[
        {
           name:'raunak',
           pid:'211111',
           class:'teitb',
           score:'10'
        },
        {
            name:'roshan',
            pid:'211112',
            class:'teitb',
            score:'9'
         }
    ]
  return (
    <div>
       <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >pid</TableCell>
            <TableCell >class</TableCell>
            <TableCell >score</TableCell>
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
              <TableCell >{row.pid}</TableCell>
              <TableCell >{row.class}</TableCell>
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
