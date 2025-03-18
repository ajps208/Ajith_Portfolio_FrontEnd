import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../App.css";
import { useGetAnswer } from "../Helper/ReactQuery/getAnswer";
import { useAnswerStore } from "../Helper/Store/AnswerStore";
import { useDarkModeStore } from "../Helper/Store/DarkModeStore";

export const InputBox = () => {
  const [question, setQuestion] = useState("");
  const getAnswer = useGetAnswer();
  const { messages, clearMessages,addMessage} = useAnswerStore();
  const { darkMode } = useDarkModeStore();

  const HandleSubmit = () => {
    console.log("handle submit");

    if (question.trim() !== "") {
      getAnswer.mutate(question);
      setQuestion("");
    } else {
      alert("Please enter a question");
    }
  };

  const ImageClick = () => {
    addMessage({ question:"Generate Image ", answer: "Image", loading: false });
  }

  const ResumeClick = () => {
    addMessage({ question:"Generate Resume", answer: "Resume", loading: false });
  }

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
          backgroundColor: darkMode ? "#2a2a2a" : "grey.100",
        }}
      >
        <TextField
          id="standard-multiline-flexible"
          multiline
          maxRows={15}
          variant="standard"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          autoFocus
          InputProps={{
            disableUnderline: true,
            sx: {
              color: darkMode ? "white" : "black", 
              fontSize: "1rem",
              lineHeight: "1.6",
            },
          }}
          sx={{
            width: "100%",
            minHeight: "50px",
            maxHeight: "50vh",
            height: "auto",
            overflow: "hidden",
            resize: "none",
            backgroundColor: darkMode ? "#2a2a2a" : "grey.100",
            color: darkMode ? "white" : "black",
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
            <Tooltip title="Generate Resume">
              <IconButton className="iconButton" onClick={ResumeClick}>
                <AttachFileIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>{" "}
            <Tooltip title="Generate image">
              <IconButton className="iconButton" onClick={ImageClick}>
                <ImageIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            {messages.length > 0 && (
              <Button
                variant="outlined"
                startIcon={<DeleteOutlineIcon />}
                onClick={clearMessages}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  borderColor:darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
                  color:darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                  fontSize: "14px",
                  ml: 1,
                  "&:hover": {
                    borderColor:darkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
                    backgroundColor:darkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                New Chat
              </Button>
            )}
          </Box>
          <Box>
            <Tooltip title="Send">
              <IconButton className="iconButton" onClick={HandleSubmit}>
                <SendIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
