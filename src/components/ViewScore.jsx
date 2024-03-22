import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQueries, useQuery } from "react-query";
import { useCookie } from "../cookie/useCookie";
import axios from "axios";
import Button from "@mui/material/Button";
import TopBar from "./TopBar";

const fetchStudent = (pid) => {
  return axios.get(`http://localhost:3000/api/student/${pid}`);
};
const fetchquizes = (id) => {
  return axios.get(`http://localhost:3000/quiz/addquiz/${id}`);
};
const ViewScore = () => {
  const { get } = useCookie("auth");
  const [quizid, setQuizid] = useState();
  // fetching students data
  const { isLoading, data } = useQuery(
    "fetchstudent",
    () => fetchStudent(get().pid),
    {
      onSuccess: (data) => {
        const arr = data?.data[0].assignedQuiz.filter(
          (item) => item.status === "Attempted"
        );
        const quizid = arr.map((item) => item.quizid);
        setQuizid(quizid);
      },
    }
  );
  // fetching dynamic parallel queries for multiple quizids
  const quizResultQueries = quizid
    ? quizid.map((id) => ({
        queryKey: ["quiz-id", id],
        queryFn: () => fetchquizes(id),
      }))
    : [];

  const result = useQueries(quizResultQueries);
  // console.log("DYnamic data is:",result[0]?.data?.data);

  if (!isLoading) {
    var arr = data?.data[0].assignedQuiz.filter(
      (item) => item.status === "Attempted"
    );
    console.log("Extracted data is::", arr, "quiz ides are::", quizid);
  }

  return (
    <>
      <TopBar />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result &&
              result.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.data &&
                      row.data.data &&
                      row.data.data[0] &&
                      row.data.data[0].subname}
                  </TableCell>
                  <TableCell> {arr[index].status} </TableCell>
                  <TableCell>
                    <Button variant="contained" color="success">
                      {arr[index].score}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ViewScore;
