import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Button } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useCookie } from "../../cookie/useCookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchquiz = () => {
  return axios.get("http://localhost:3000/quiz/addquiz");
};
const Myquiz = () => {
  const { isLoading, data } = useQuery("fetchall quizes", fetchquiz);
  const { get, set } = useCookie("teacher");
  const navigate = useNavigate();
  console.log("data is::", data?.data);

  // handling view quiz
  const handleView = (id) => {
    set(id);
    navigate("/teacher/view");
  };

  // handle delete function
  const Delete = (row) => {
    console.log("Delete item is:", row);
    // const id = row._id;
    axios
      .delete(`http://localhost:3000/quiz/addquiz/${row}`)
      .then((resp) => {
        toast.success("Aha ! Deleted", {
          position: "top-center",
        });
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Something Went Wrong  !", {
          position: "top-center",
        });
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.subname}
                </TableCell>
                <TableCell>{row._id}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      Delete(row._id);
                    }}
                    sx={{ color: "red" }}
                    variant="text"
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleView(row._id);
                    }}
                    sx={{ color: "green" }}
                    variant="text"
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </div>
  );
};

export default Myquiz;
