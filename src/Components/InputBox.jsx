import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Paper,
  Typography,
  Fade,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddIcon from "@mui/icons-material/Add";
import "../App.css";
import { useGetAnswer } from "../Helper/ReactQuery/getAnswer";
import { useAnswerStore } from "../Helper/Store/AnswerStore";
import { useDarkModeStore } from "../Helper/Store/DarkModeStore";
import { questionsArray } from "../Helper/Questions/questions";



export const InputBox = () => {
  const [question, setQuestion] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const getAnswer = useGetAnswer();
  const { messages, clearMessages, addMessage } = useAnswerStore();
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    getRandomQuestions();
  }, [messages]);

  const getThemeColors = () => ({
    primary: darkMode ? "#3a8eff" : "#1976d2",
    inputBg: darkMode ? "#3a3a3a" : "#f9f9f9",
    cardBg: darkMode ? "#2a2a2a" : "#ffffff",
    textPrimary: darkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.87)",
    textSecondary: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
    border: darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
    chipBg: darkMode ? "rgba(58, 142, 255, 0.15)" : "rgba(25, 118, 210, 0.08)",
    chipHover: darkMode
      ? "rgba(58, 142, 255, 0.25)"
      : "rgba(25, 118, 210, 0.15)",
    iconColor: darkMode ? "#3a8eff" : "#1976d2",
  });

  const theme = {
    colors: {
      primary: darkMode ? "#4d9fff" : "#2563eb",
      primaryLight: darkMode
        ? "rgba(77, 159, 255, 0.15)"
        : "rgba(37, 99, 235, 0.08)",
      primaryDark: darkMode ? "#3a7bcc" : "#1d4ed8",
      background: darkMode ? "#1a1a1a" : "#ffffff",
      surface: darkMode ? "#252525" : "#f8fafc",
      inputBg: darkMode ? "#2d2d2d" : "#ffffff",
      textPrimary: darkMode ? "#ffffff" : "#1e293b",
      textSecondary: darkMode ? "#a0a0a0" : "#64748b",
      border: darkMode ? "#333333" : "#e2e8f0",
      shadow: darkMode
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      hover: darkMode ? "#333333" : "#f1f5f9",
    },
    transitions: {
      standard: "all 0.2s ease",
    },
    borderRadius: {
      small: "8px",
      medium: "12px",
      large: "16px",
      pill: "9999px",
    },
  };

  const colors = getThemeColors();

  const getRandomQuestions = () => {
    const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 3);
    setSuggestedQuestions(selectedQuestions);
  };

  const handleSubmit = () => {
    if (question.trim() !== "") {
      getAnswer.mutate(question);
      setQuestion("");
    } else {
      alert("Please enter a question");
    }
  };

  const handleImageClick = () => {
    addMessage({
      question: "Generate Image",
      answer: "Here is the Generated Image...",
      loading: false,
    });
  };

  const handleResumeClick = () => {
    addMessage({
      question: "Generate Resume",
      answer: "Here is the Generate Resume...",
      loading: false,
    });
  };

  const handleSuggestedQuestionClick = (suggestedQuestion) => {
    getAnswer.mutate(suggestedQuestion);
  };

  const SuggestionChip = ({ question, onClick }) => (
    <Chip
      label={question}
      onClick={() => onClick(question)}
      sx={{
        backgroundColor: colors.chipBg,
        color: colors.textPrimary,
        borderRadius: "12px",
        fontSize: "13px",
        fontWeight: 400,
        height: "30px",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: colors.chipHover,
          transform: "translateY(-1px)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
      }}
    />
  );

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
      <Paper
        elevation={0}
        sx={{
          position: "absolute",
          bottom: 0,
          width: "85%",
          borderRadius: {
            xs: `${theme.borderRadius.large} ${theme.borderRadius.large} 0 0`,
            md: theme.borderRadius.large,
          },
          padding: { xs: "12px", sm: "16px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme.colors.surface,
          boxShadow: isFocused ? theme.colors.shadow : "none",
          transition: theme.transitions.standard,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        {/* Input Area */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: "56px",
            borderRadius: theme.borderRadius.medium,
            backgroundColor: theme.colors.inputBg,
            border: `1px solid ${theme.colors.border}`,
            transition: theme.transitions.standard,
            mb: 2,
            ...(isFocused && {
              boxShadow: `0 0 0 3px ${theme.colors.primaryLight}`,
              borderColor: theme.colors.primary,
            }),
          }}
        >
          <TextField
            id="message-input"
            multiline
            maxRows={5}
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Type your message here..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                padding: "14px 60px 14px 14px",
                fontSize: "15px",
                lineHeight: 1.5,
                color: theme.colors.textPrimary,
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              gap: "6px",
            }}
          >
            <Tooltip title="Send Message">
              <IconButton
                color="primary"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: theme.colors.primary,
                  color: "#ffffff",
                  width: "36px",
                  height: "36px",
                  "&:hover": {
                    backgroundColor: theme.colors.primaryDark,
                  },
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Suggestions and Actions */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: { xs: "16px", sm: "8px" },
          }}
        >
          {/* Tools Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              order: { xs: 2, sm: 1 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.colors.hover,
                borderRadius: theme.borderRadius.pill,
                padding: "2px",
              }}
            >
              <Tooltip title="Generate Resume">
                <IconButton
                  size="small"
                  onClick={handleResumeClick}
                  sx={{
                    color: theme.colors.textSecondary,
                    width: "34px",
                    height: "34px",
                  }}
                >
                  <AttachFileIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Generate Image">
                <IconButton
                  size="small"
                  onClick={handleImageClick}
                  sx={{
                    color: theme.colors.textSecondary,
                    width: "34px",
                    height: "34px",
                  }}
                >
                  <ImageIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {messages.length > 0 && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={clearMessages}
                sx={{
                  textTransform: "none",
                  borderRadius: theme.borderRadius.pill,
                  borderColor: theme.colors.border,
                  color: theme.colors.textSecondary,
                  fontSize: "13px",
                  height: "34px",
                  padding: "6px 14px",
                  "&:hover": {
                    backgroundColor: theme.colors.hover,
                    borderColor: theme.colors.textSecondary,
                  },
                }}
              >
                New Chat
              </Button>
            )}
          </Box>

          {/* Suggested Questions */}
          {messages.length > 0 && (
            <Fade in={suggestedQuestions.length > 0} timeout={500}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "8px", sm: "12px" },
                  flexWrap: "nowrap",
                  overflow: "auto",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                  order: { xs: 1, sm: 2 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.colors.primary,
                    flexShrink: 0,
                  }}
                >
                  <AutoAwesomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      display: { xs: "none", sm: "inline" },
                    }}
                  >
                    Suggested:
                  </Typography>
                </Box>

                {suggestedQuestions.map((item) => (
                  <SuggestionChip
                    key={item._id}
                    question={item.question}
                    onClick={handleSuggestedQuestionClick}
                  />
                ))}
              </Box>
            </Fade>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
