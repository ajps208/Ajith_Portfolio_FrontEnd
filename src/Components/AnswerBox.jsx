import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import React, { useEffect, useMemo, useRef } from "react";
import { useAnswerStore } from "../Helper/Store/AnswerStore";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { useDarkModeStore } from "../Helper/Store/DarkModeStore";
import { useFetchQuestions } from "../Helper/ReactQuery/getQuestions";
import { useQuestionStore } from "../Helper/Store/QuestionStore";
import { useGetAnswer } from "../Helper/ReactQuery/getAnswer";
import { questionsArray } from "../Helper/Questions/questions";

export const AnswerBox = () => {
  const { messages } = useAnswerStore();
  const { setQuestion } = useQuestionStore();
  const { darkMode } = useDarkModeStore();
  const getAnswer = useGetAnswer();
  const bottomRef = useRef(null); // Ref for scrolling

  // Scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getRandomQuestions = (questions, count = 8) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomSuggestions = useMemo(() => {
    return questionsArray && questionsArray.length > 0
      ? getRandomQuestions(questionsArray)
      : [];
  }, [questionsArray]);

  const handleSuggestionClick = (questionText) => {
    if (questionText.trim() !== "") {
      getAnswer.mutate(questionText);
    }
  };

  useEffect(() => {
    if (questionsArray) setQuestion(questionsArray);
  }, [questionsArray, setQuestion]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        padding: "20px 0",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#c1c1c1",
          borderRadius: "10px",
          "&:hover": {
            background: "#a1a1a1",
          },
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", sm: "90%", md: "85%" },
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              backgroundColor: darkMode ? "#2a2a2a" : "rgba(0,0,0,0.02)",
              borderRadius: 4,
              padding: 4,
              textAlign: "center",
              opacity: 0.8,
            }}
          >
            <Typography variant="h6" mb={2} color={darkMode ? "#fff" : "text.primary"}>
              Ask a question to get started
            </Typography>
            {/* <Typography variant="body2" mb={3} color={darkMode ? "#fff" : "text.secondary"}>
              Your conversation  will appear here
            </Typography> */}
            {randomSuggestions.length > 0 && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    color: darkMode ? "#fff" : "text.primary",
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  Suggested Questions:
                </Typography>
                <Grid container spacing={1.5} justifyContent="center">
                  {randomSuggestions.map((item, index) => (
                    <Grid item key={item._id || index}>
                      <Chip
                        label={item.question}
                        onClick={() => handleSuggestionClick(item.question)}
                        sx={{
                          backgroundColor: darkMode ? "#424242" : "#f5f5f5",
                          color: darkMode ? "#fff" : "#333",
                          fontWeight: 500,
                          px: 1,
                          py: 1,
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: darkMode ? "#535353" : "#e0e0e0",
                            cursor: "pointer",
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        ) : (
          messages.map((message, index) => (
            <Box key={index}>
              {/* Question */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    marginRight: "12px",
                    width: 40,
                    height: 40,
                    boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  U
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      You
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: darkMode ? "white" : "text.secondary" }}
                    >
                      {format(new Date(), "h:mm a")}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "primary.light",
                      color: "primary.contrastText",
                      padding: "12px 16px",
                      borderRadius: "16px 16px 16px 0",
                      display: "inline-block",
                      maxWidth: "100%",
                      wordBreak: "break-word",
                      boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1rem",
                        lineHeight: "1.7",
                      }}
                    >
                      {message.question}
                    </Typography>
                  </Box>
                </Box>
              </Box>


              {/* Answer */}
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar sx={{ bgcolor: "#6C5CE7", mr: 2 }}>A</Avatar>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontWeight={600}>Assistant</Typography>
                    <Typography variant="caption">
                      {format(new Date(), "h:mm a")}
                    </Typography>
                  </Box>

                  {message.loading ? (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <CircularProgress size={20} sx={{ color: "#6C5CE7", mr: 2 }} />
                      <Typography>Generating answer...</Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        mt: 1,
                        backgroundColor: darkMode ? "#2a2a2a" : "grey.100",
                        color: darkMode ? "#fff" : "#000",
                        p: 3,
                        borderRadius: "16px 16px 0 16px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1.1rem",
                        lineHeight: 1.7,
                        "& pre": {
                          backgroundColor: "#2d2d2d",
                          color: "#fff",
                          padding: "12px",
                          borderRadius: "8px",
                          overflowX: "auto",
                          fontFamily: "'Roboto Mono', monospace",
                        },
                        "& code": {
                          backgroundColor: "#f0f0f0",
                          color: "#333",
                          padding: "2px 4px",
                          borderRadius: "4px",
                          fontFamily: "'Roboto Mono', monospace",
                        },
                      }}
                    >
                      <ReactMarkdown
                        components={{
                          img: ({ node, ...props }) => (
                            <Box sx={{ textAlign: "center" }}>
                              <img
                                {...props}
                                loading="lazy"
                                alt={props.alt || "Image"}
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                  borderRadius: "8px",
                                  marginTop: "12px",
                                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                }}
                              />
                            </Box>
                          ),
                        }}
                      >
                        {message.answer}
                      </ReactMarkdown>

                      {/* Special case images or PDFs */}
                      {message.answer.includes("Resume") && (
                        <Box sx={{ width: "100%", height: "500px", mt: 2 }}>
                          <iframe
                            src="/admin.pdf"
                            width="100%"
                            height="100%"
                            title="Resume PDF"
                            style={{ border: "1px solid black" }}
                          />
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* Suggestions after assistant error */}
                  {message.answer?.includes("I'm sorry") && randomSuggestions.length > 0 && (
                    <Box mt={2}>
                      <Typography variant="h6" mb={1}>
                        Try these instead:
                      </Typography>
                      <Grid container spacing={1.5}>
                        {randomSuggestions.map((item, idx) => (
                          <Grid item key={item._id || idx}>
                            <Chip
                              label={item.question}
                              onClick={() => handleSuggestionClick(item.question)}
                              sx={{
                                backgroundColor: darkMode ? "#424242" : "#f5f5f5",
                                color: darkMode ? "#fff" : "#333",
                                fontSize: "0.95rem",
                                fontWeight: 500,
                                px: 1.5,
                                py: 1,
                                borderRadius: "6px",
                                "&:hover": {
                                  backgroundColor: darkMode ? "#535353" : "#e0e0e0",
                                  cursor: "pointer",
                                },
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Box>
              </Box>

              {index < messages.length - 1 && (
                <Divider
                  sx={{
                    my: 2,
                    backgroundColor: darkMode ? "#2a2a2a" : "grey.200",
                  }}
                />
              )}
            </Box>
          ))
        )}
        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </Box>
    </Box>
  );
};
