import { Box, Button, IconButton, TextField } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import "../App.css";

export const InputBox = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0, // Anchors the box to the bottom
          width: { xs: "100%", md: "100%" },
          borderRadius: "20px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <TextField
          id="standard-multiline-flexible"
          multiline
          maxRows={15}
          variant="standard"
          label={false} // Removes the label
          InputProps={{
            disableUnderline: true, // Removes the underline
          }}
          sx={{
            width: "100%",
            minHeight: "50px",
            maxHeight: "50vh",
            height: "auto",
            overflow: "hidden",
            resize: "none",
            backgroundColor: "white",
          }}
        />

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
            <IconButton className="iconButton">
              <AttachFileIcon sx={{ color: "white" }} />
            </IconButton>{" "}
            <IconButton className="iconButton">
              <ImageIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <Box>
            <IconButton className="iconButton">
              <SendIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
