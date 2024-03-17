
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import TopBar from './TopBar';
import axios from 'axios';
import { useState ,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useQuery } from 'react-query';


const fetchGet=()=>{
  return axios.get('http://localhost:3000/form')
}

export default function MyForm() {
const [formdata,setFormdata]=useState([]);
   const {isLoading,data,isError,error,isFetching}= useQuery(
      'use-query',
      fetchGet,
      {
        // refetchOnWindowFocus:true
        // refetchInterval:1000
      }
    );
  


// handle delete function
const Delete=(row)=>{
     console.log("Delete item is:",row._id);
     const id=row._id;
     axios.delete(`http://localhost:3000/form/${id}`)
     .then(resp=>{
      toast.success("Aha ! Deleted", {
        position: "top-center"}) 
     })
     .catch(err=>{
      toast.error("Something Went Wrong  !", {
        position: "top-center"})   


     })
}



// useEffect(() => {
  
//   axios.get('http://localhost:3000/form')
//       .then(response => {
//           // Set the retrieved form data in the state
//           setFormdata(response.data);   
//       })
//       .catch(error => {
//         toast.error("Something Went Wrong  !", {
//           position: "top-center"
//         });
//           console.error('Error fetching form data:', error);
//       });
// }, []);

// console.log(JSON.stringify(formdata[0].filename));


  return (
   <>
   <TopBar/>
   <Box sx={{
    display:'flex',
    justifyContent:'center'
   }}>
      <Box sx={{
        width:'70%',
        mt:'2%'
      }}>
      <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Download</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row,index) => (
            <TableRow
             key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope ="row">
                {row.filename}
              </TableCell>
              <TableCell >{row.createdAt}</TableCell>
              <TableCell >
                <Button variant="text" color="inherit">
                <DownloadIcon/>
                </Button>
              </TableCell>
              <TableCell >
                <Button onClick={()=>{Delete(row)}} sx={{color:'red'}} variant="text" >
                <DeleteOutlineIcon/>
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
}
