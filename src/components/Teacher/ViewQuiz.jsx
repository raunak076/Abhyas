import React from "react";
import { useCookie } from "../../cookie/useCookie";
import { Card, FormControlLabel, RadioGroup } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import TopBar from "../TopBar";

const fetchdata = (id) => {
  return axios.get(`http://localhost:3000/quiz/addquiz/${id}`);
};
const ViewQuiz = () => {
  const { get } = useCookie("teacher");
  const { isLoading, data } = useQuery("fetch-quiz", () => fetchdata(get()));
  console.log("id is:::", get(), typeof get());
  if (!isLoading) {
    console.log("quiz data is::", data.data);
    data.data[0].questions.map((item) => {
      console.log("item is::", item);
    });
  }
  return (
    <>
      <TopBar />
      {data?.data[0].questions.map((item, index) => {
        return (
          <Card
            sx={{
              padding: "1% 5%",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <p style={{ fontWeight: "900" }}>
                Q.{index + 1} {item.question}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <ul>
                <li>{item.A}</li>
                <li>{item.B}</li>
                <li>{item.C}</li>
                <li>{item.D}</li>
              </ul>
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default ViewQuiz;

{
  /* <h1>{!isLoading && data?.data[0].questions[0].question}</h1>; */
}
