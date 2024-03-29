import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import TopBar from "../TopBar";

const fetchpost = () => {
  return axios.get("http://localhost:3000/quiz/addquiz");
};
const PostQuiz = () => {
  const {
    isLoading,
    isError,
    error,
    data: post,
  } = useQuery("fetch-questions", fetchpost);

  const postquiz = (id) => {
    try {
      axios
        .put("http://localhost:3000/quiz/postquiz", {
          _id: id,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log("Error has occured", e);
        });
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <>
      <TopBar />
      <Box
        sx={{
          padding: "1%",
          bgcolor: "white",
          height: "100vh",
        }}
      >
        <h1>Created Quizes</h1>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <h1>Loading...</h1>
                </>
              ) : (
                <>
                  {post?.data.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.subname}
                      </TableCell>
                      <TableCell>{row.due}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            postquiz(row._id);
                          }}
                          variant="text"
                          color="success"
                        >
                          post
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default PostQuiz;
