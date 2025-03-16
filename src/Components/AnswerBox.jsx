import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import React from "react";
import { useAnswerStore } from "../Helper/Store/AnswerStore";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns"; // For message timestamps
import { useDarkModeStore } from "../Helper/Store/DarkModeStore";

export const AnswerBox = () => {
  const { messages } = useAnswerStore();
  const reversedMessages = [...messages].reverse();
  const { darkMode } = useDarkModeStore();

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
              height: "200px",
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
              sx={{ color: darkMode ? "white" : "text.secondary" }}
            >
              Your conversation history will appear here
            </Typography>
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
                        fontSize: "1rem",
                        lineHeight: "1.6",
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
                        backgroundColor: "grey.100",
                        padding: "16px",
                        borderRadius: "16px 16px 0 16px",
                      }}
                    >
                      <CircularProgress size={24} sx={{ color: "#6C5CE7" }} />
                      <Typography sx={{ ml: 2, color: "text.secondary" }}>
                        Generating answer...
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: darkMode ? "#2a2a2a" : "grey.100",
                        padding: "16px",
                        borderRadius: "16px 16px 0 16px",
                        boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.5)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1.3rem",
                        lineHeight: "1.6",
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
                        },
                      }}
                    >
                      <ReactMarkdown>{message.answer}</ReactMarkdown>
                    </Box>
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
