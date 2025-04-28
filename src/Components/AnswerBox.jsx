import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useAnswerStore } from "../Helper/Store/AnswerStore";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns"; // For message timestamps
import { useDarkModeStore } from "../Helper/Store/DarkModeStore";
import { useFetchQuestions } from "../Helper/ReactQuery/getQuestions";
import { useQuestionStore } from "../Helper/Store/QuestionStore";
import { useGetAnswer } from "../Helper/ReactQuery/getAnswer";
import { questionsArray } from "../Helper/Questions/questions";

export const AnswerBox = () => {
  const { messages, addMessage } = useAnswerStore();
  const { data: fetchedQuestion, isLoading } = useFetchQuestions();
  const { question, setQuestion } = useQuestionStore();
  const { darkMode } = useDarkModeStore();
  const getAnswer = useGetAnswer();

  const reversedMessages = [...messages].reverse();

  // Function to get random questions
  const getRandomQuestions = (questions, count = 8) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  // Get random questions when component mounts or when questionsArray changes
  const randomSuggestions = useMemo(() => {
    if (questionsArray && questionsArray.length > 0) {
      return getRandomQuestions(questionsArray);
    }
    return [];
  }, [questionsArray]);

  // Handler for clicking a suggested question
  const handleSuggestionClick = (questionText) => {
    if (questionText.trim() !== "") {
      getAnswer.mutate(questionText);
    } else {
      alert("Please enter a question");
    }
  };

  useEffect(() => {
    if (questionsArray) {
      setQuestion(questionsArray);
    }
  }, [questionsArray, setQuestion]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        overflowY: "auto",
        overflowX: "hidden",
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
          width: { xs: "95%", sm: "90%", md: "100%" },
          maxWidth: "85%",
          display: "flex",
          gap: "24px",
          flexDirection: "column",
        }}
      >
        {reversedMessages.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
              minHeight: "200px",
              opacity: 0.7,
              width: "100%",
              backgroundColor: darkMode ? "#2a2a2a" : "rgba(0, 0, 0, 0.02)",
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: "12px",
                color: darkMode ? "white" : "text.primary",
              }}
            >
              Ask a question to get started
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: darkMode ? "white" : "text.secondary",
                marginBottom: "24px",
              }}
            >
              Your conversation history will appear here
            </Typography>

            {/* Suggested Questions */}
            {randomSuggestions.length > 0 && (
              <Box sx={{ width: "100%", mt: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: darkMode ? "#fff" : "text.primary",
                    mb: 1.5,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  Suggested Questions:
                </Typography>
                <Grid container spacing={1.5}>
                  {randomSuggestions.map((item, index) => (
                    <Grid item key={item._id || index}>
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
                          boxShadow: darkMode
                            ? "0px 2px 4px rgba(255, 255, 255, 0.1)"
                            : "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          "&:hover": {
                            backgroundColor: darkMode ? "#535353" : "#e0e0e0",
                            boxShadow: darkMode
                              ? "0px 3px 6px rgba(255, 255, 255, 0.15)"
                              : "0px 3px 6px rgba(0, 0, 0, 0.15)",
                            cursor: "pointer",
                          },
                          transition: "all 0.3s ease-in-out",
                          mb: 1,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        ) : (
          reversedMessages.map((message, index) => (
            <Box key={index} sx={{ width: "100%" }}>
              {/* Question section */}
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
                        fontSize: "1.1rem",
                        lineHeight: "1.7",
                      }}
                    >
                      {message.question}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Answer section */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "24px",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#6C5CE7",
                    marginRight: "12px",
                    width: 40,
                    height: 40,
                    boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  A
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
                      Assistant
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: darkMode ? "white" : "text.secondary" }}
                    >
                      {format(new Date(), "h:mm a")}
                    </Typography>
                  </Box>

                  {message.loading ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#2a2a2a",
                        padding: "16px",
                        borderRadius: "16px 16px 0 16px",
                      }}
                    >
                      <CircularProgress size={24} sx={{ color: "#6C5CE7" }} />
                      <Typography sx={{ ml: 2, color: "white" }}>
                        Generating answer...
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Box
                        sx={{
                          backgroundColor: darkMode ? "#2a2a2a" : "grey.100",
                          padding: "35px",
                          borderRadius: "16px 16px 0 16px",
                          boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.5)",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "1.3rem",
                          lineHeight: "1.7",
                          width: "100%",
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
                          "& a": {
                            color: "#6C5CE7",
                            textDecoration: "none",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          },
                          "& img": {
                            maxWidth: "100%",
                            borderRadius: "8px",
                            marginTop: "12px",
                            marginBottom: "12px",
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
                                  style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                  }}
                                  alt={props.alt || "Image"}
                                />
                              </Box>
                            ),
                          }}
                        >
                          {message.answer}
                        </ReactMarkdown>

                        {/* Handle direct image URLs that might not be in markdown format */}
                        {message.answer.includes("Image") && (
                          <>
                            <Box sx={{ textAlign: "center", mt: 2 }}>
                              <img
                                src="/logo512.png"
                                alt="Direct image link"
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                  borderRadius: "8px",
                                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                }}
                                loading="lazy"
                              />
                            </Box>
                          </>
                        )}
                        {message.answer.includes("Resume") && (
                          <>
                            <Box sx={{ width: "100%", height: "500px", mt: 2 }}>
                              <iframe
                                src="/admin.pdf"
                                width="100%"
                                height="100%"
                                title="Generated PDF"
                                style={{ border: "1px solid black" }}
                              />
                            </Box>
                          </>
                        )}
                      </Box>

                      {/* Show suggested questions for specific error message */}
                      {message.answer.includes("I'm sorry ") &&
                        randomSuggestions.length > 0 && (
                          <Box sx={{ width: "100%", mt: 2 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: darkMode ? "#fff" : "text.primary",
                                mb: 1.5,
                                fontWeight: 600,
                                letterSpacing: "0.5px",
                              }}
                            >
                              Try these instead:
                            </Typography>
                            <Grid container spacing={1.5}>
                              {randomSuggestions.map((item, index) => (
                                <Grid item key={item._id || index}>
                                  <Chip
                                    label={item.question}
                                    onClick={() =>
                                      handleSuggestionClick(item.question)
                                    }
                                    sx={{
                                      backgroundColor: darkMode
                                        ? "#424242"
                                        : "#f5f5f5",
                                      color: darkMode ? "#fff" : "#333",
                                      fontSize: "0.95rem",
                                      fontWeight: 500,
                                      px: 1.5,
                                      py: 1,
                                      borderRadius: "6px",
                                      boxShadow: darkMode
                                        ? "0px 2px 4px rgba(255, 255, 255, 0.1)"
                                        : "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                      "&:hover": {
                                        backgroundColor: darkMode
                                          ? "#535353"
                                          : "#e0e0e0",
                                        boxShadow: darkMode
                                          ? "0px 3px 6px rgba(255, 255, 255, 0.15)"
                                          : "0px 3px 6px rgba(0, 0, 0, 0.15)",
                                        cursor: "pointer",
                                      },
                                      transition: "all 0.3s ease-in-out",
                                      mb: 1,
                                    }}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )}
                    </>
                  )}
                </Box>
              </Box>

              {index < reversedMessages.length - 1 && (
                <Divider
                  sx={{
                    marginY: "8px",
                    backgroundColor: darkMode ? "#2a2a2a" : "grey.200",
                  }}
                />
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
