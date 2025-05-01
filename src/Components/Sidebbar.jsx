import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Switch,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useAnswerStore } from "../Helper/Store/AnswerStore";
import { useDarkModeStore } from "../Helper/Store/DarkModeStore";

export const Sidebbar = () => {
  const { history, loadHistory, deleteHistory, clearMessages } =
    useAnswerStore();
  const { darkMode, setDarkMode } = useDarkModeStore();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        padding: "16px",
        boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.33)",
        display: "flex",
        flexDirection: "column",
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        position: "relative",
      }}
    >
      {/* Header with Logo */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: darkMode ? "#61dafb" : "#2196f3",
            mb: 1,
          }}
        >
          AjithGPT
        </Typography>
        <Divider />
      </Box>

      {/* New Chat Button */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={clearMessages}
        sx={{
          mb: 2,
          backgroundColor: darkMode ? "#61dafb" : "#2196f3",
          color: darkMode ? "#000000" : "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          "&:hover": {
            backgroundColor: darkMode ? "#4ecdc4" : "#1976d2",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
          },
          padding: "10px 16px",
          fontWeight: "bold",
        }}
      >
        <ChatIcon sx={{ mr: 1 }} /> New Chat
      </Button>

      {/* Chat History */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Chat History
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: darkMode ? "#333333" : "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: darkMode ? "#888888" : "#c1c1c1",
            borderRadius: "4px",
            "&:hover": {
              background: darkMode ? "#aaaaaa" : "#a1a1a1",
            },
          },
          pr: 1,
          mr: -1,
        }}
      >
        <List>
          {history.length === 0 ? (
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "150px",
                backgroundColor: darkMode ? "#282828" : "#f9f9f9",
                borderRadius: "8px",
                border: `1px dashed ${darkMode ? "#555555" : "#cccccc"}`,
              }}
            >
              <ChatIcon
                sx={{
                  fontSize: 40,
                  color: darkMode ? "#aaaaaa" : "#888888",
                  mb: 1,
                }}
              />
              <ListItemText
                primary="No History Yet"
                secondary="Start a new chat to begin"
                primaryTypographyProps={{
                  align: "center",
                  color: darkMode ? "#aaaaaa" : "#666666",
                  fontWeight: "medium",
                }}
                secondaryTypographyProps={{
                  align: "center",
                  color: darkMode ? "#888888" : "#999999",
                }}
              />
            </ListItem>
          ) : (
            history.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: darkMode ? "#333333" : "#f5f5f5",
                    transform: "translateX(4px)",
                    transition: "all 0.2s ease",
                  },
                  borderRadius: "8px",
                  mb: 1,
                  padding: "10px 12px",
                  border: `1px solid ${darkMode ? "#333333" : "#eeeeee"}`,
                  transition: "all 0.2s ease",
                }}
                onClick={() => loadHistory(item.id)}
              >
                <ListItemText
                  primary={
                    <Typography
                      noWrap
                      sx={{
                        color: darkMode ? "#ffffff" : "#000000",
                        fontWeight: "medium",
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{
                        color: darkMode ? "#bbbbbb" : "#666666",
                        fontSize: "0.75rem",
                      }}
                    >
                      {new Date(item.id).toLocaleString()}
                    </Typography>
                  }
                  sx={{ maxWidth: "80%" }}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHistory(item.id);
                  }}
                  sx={{
                    color: darkMode ? "#bbbbbb" : "#888888",
                    "&:hover": {
                      color: darkMode ? "#ff6b6b" : "#f44336",
                      backgroundColor: darkMode
                        ? "rgba(255,107,107,0.1)"
                        : "rgba(244,67,54,0.1)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>

      {/* Footer with Theme Toggle and Social Media */}
      <Box sx={{ mt: 2 }}>
        <Divider sx={{ mb: 2 }} />

        {/* Theme Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <LightModeIcon sx={{ color: darkMode ? "#bbbbbb" : "#f9a825" }} />
          <Switch checked={darkMode} onChange={setDarkMode} color="primary" />
          <DarkModeIcon sx={{ color: darkMode ? "#8796a5" : "#555555" }} />
        </Box>

        {/* Social Media Icons */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 1, flexWrap: "wrap" }}
        >
          <IconButton
            size="small"
            sx={{
              color: darkMode ? "#0a66c2" : "#0077b5",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/ajith-ps-16a743259/",
                "_blank"
              )
            }
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: darkMode ? "#ea4335" : "#d93025",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={() => window.open("mailto:ajthps208@gmail.com", "_blank")}
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: darkMode ? "#4267B2" : "#1877f2",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={() => window.open("https://github.com/ajps208", "_blank")}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: darkMode ? "#e1306c" : "#c13584",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => (window.location.href = "tel:+8139095765")}
            sx={{
              color: darkMode ? "#4caf50" : "#00a152",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            <PhoneIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: darkMode ? "#ff9800" : "#f57c00",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={() =>
              window.open("https://portfolio-ajith-ps.vercel.app/", "_blank")
            }
          >
            <WorkOutlineIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};
