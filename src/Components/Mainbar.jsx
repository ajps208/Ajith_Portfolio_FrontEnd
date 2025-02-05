import { Box, Grid } from "@mui/material";
import React from "react";
import { Navbar } from "./Navbar";
import { AnswerBox } from "./AnswerBox";
import { InputBox } from "./InputBox";

export const Mainbar = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Grid item xs={12} md={12} sx={{ height: "7vh" }}>
          <Navbar />
        </Grid>
        <Grid item xs={12} md={12} sx={{ height: "93vh", padding: 3 }}>
          <Box sx={{width: "100%", height: "80%" }}>
            <AnswerBox />
          </Box>
          <Box sx={{width: "100%", height: "20%",marginTop:"5px"}}>
            <InputBox />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
