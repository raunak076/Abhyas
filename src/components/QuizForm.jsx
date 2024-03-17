import { Box, Card, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import form from "../styles/form.module.css"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import style from "../styles/styles.module.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const QuizForm = ({ pop, setPop }) => {
  const [type, setType] = useState("");
  const [namet, setNameT] = useState("");
  const [named, setNameD] = useState("");
  const [content, setContent] = useState("");

  // function for submiting data
  const handletext = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/form', {
      filename: namet,
      content: content
    }).then((data) => {
      toast.success("Aha ! Check form section", {
        position: "top-center"
      });
      console.log(data);
    }).catch(() => {
      toast.error("Ahh ! Error Occurred", {
        position: "top-center"
      });
    })
  }



  return (
    <>
      <Card className={style.mainpop} sx={{
        position: 'absolute',
        zIndex: '10000',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '10px',
        background:'transparent',
        backdropFilter:'blur(100px)'
      }}>

        {/* choose document type --> */}
        <Box sx={{ textAlign: 'end' }}>
          <Button onClick={() => { setPop(!pop) }} variant="text" color="error">
            <CloseOutlinedIcon />
          </Button>
        </Box>
        <Box>
          <h1>  Choose Document Type</h1>
        </Box>
        {/* select document type */}
        <Box>
          <Stack p={1} justifyContent={'center'} gap={1} direction={'row'}>
            <Button onClick={() => { setType('text') }} sx={{
              height: '50px',
              width: '50px',
              border: '1px solid black',
              color:'#ffb703'
            }} variant="text" >
              {type === 'text' ? <CheckOutlinedIcon color='success' /> : "Text"}
            </Button>
            <Button onClick={() => { setType('document') }} sx={{
              height: '50px',
              width: 'auto',
              border: '1px solid black',
              color:'#ffb703'
            }} variant="text" >
              {type === 'document' ? <CheckOutlinedIcon color='success' /> : "Document"}
            </Button>
          </Stack>
        </Box>

        {/* conditional form rendering -->> */}
        {
          type === "text" ? <>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              background:'transparent',
              backdropFilter:'blur(100px)'
            }}>
              <Card sx={{
                width: '90%',
                padding: '5%',
                background:'transparent',
                backdropFilter:'blur(100px)'
              }}>
                <form onSubmit={handletext} action="">
                  <p className={form.p}>Paste Data Here</p>
                  <Box>
                    <input className={form.input} value={namet} onChange={(e) => { setNameT(e.target.value) }} placeholder='File Name' type="text" name="" id="" /><br></br>
                    <textarea  placeholder='Paste Data to generate questions' className={form.textarea} value={content} onChange={(e) => { setContent(e.target.value) }} id="" cols="20" rows="10" required></textarea>
                  </Box>
                  <Button type='submit' variant="contained" color="success">
                    Generate
                  </Button>
                </form>
              </Card>
            </Box>
          </> : ""
        }

        {/* form for document type--> */}
        {
          type === "document" ? <>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Card sx={{
                width: '90%',
                padding: '5%',
                background:'transparent',
                backdropFilter:'blur(100px)'
              }}>
                <form onSubmit={handletext} action="">
                  <p className={form.p}>Upload PPT/DOCS/PDF</p>
                  <Box>
                    <input className={form.input} value={named} onChange={(e) => { setNameD(e.target.value) }} type="text" placeholder='Filename' name="" id="" required />
                  </Box>
                  <Box>
                    <input className={form.input} type="file" name="" id="" required />
                  </Box>
                  <Button type='submit' variant="contained" color="success">
                    Generate
                  </Button>
                </form>
              </Card>
            </Box>
          </> : ""
        }
      </Card>

      {/* toast container */}
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
  )
}

export default QuizForm
