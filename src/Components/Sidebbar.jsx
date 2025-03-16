import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography, 
  Switch, 
  Divider,
  Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAnswerStore } from "../Helper/Store/AnswerStore";
import { useDarkModeStore } from "../Helper/Store/DarkModeStore";

export const Sidebbar = () => {
  const { history, loadHistory, deleteHistory } = useAnswerStore();
  const {darkMode, setDarkMode}= useDarkModeStore();



  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        padding: "16px",
        boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.33)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      {/* Header with Logo */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: "bold",
            color: darkMode ? "#61dafb" : "#2196f3",
            mb: 1
          }}
        >
          AjithGPT
        </Typography>
        <Divider />
      </Box>

      {/* Chat History */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Chat History
        </Typography>
        <List>
          {history.length === 0 ? (
            <ListItem>
              <ListItemText 
                primary="No History Yet" 
                sx={{ color: darkMode ? "#aaaaaa" : "#666666" }}
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
                    backgroundColor: darkMode ? "#333333" : "#f5f5f5" 
                  },
                  borderRadius: "8px",
                  mb: 1,
                  padding: "8px 12px",
                }}
                onClick={() => loadHistory(item.id)}
              >
                <ListItemText
                  primary={
                    <Typography
                      noWrap
                      sx={{ 
                        color: darkMode ? "#ffffff" : "#000000",
                        fontWeight: "medium"
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
                        fontSize: "0.75rem"
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
                  sx={{ color: darkMode ? "#bbbbbb" : "#888888" }}
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
            mb: 2
          }}
        >
          <LightModeIcon sx={{ color: darkMode ? "#bbbbbb" : "#f9a825" }} />
          <Switch 
            checked={darkMode}
            onChange={setDarkMode}
            color="primary"
          />
          <DarkModeIcon sx={{ color: darkMode ? "#8796a5" : "#555555" }} />
        </Box>
        
        {/* Social Media Icons */}
        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center" 
          sx={{ mt: 1 }}
        >
          <IconButton 
            sx={{ 
              color: darkMode ? "#0a66c2" : "#0077b5",
              "&:hover": { transform: "scale(1.1)" }
            }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton 
            sx={{ 
              color: darkMode ? "#ea4335" : "#d93025",
              "&:hover": { transform: "scale(1.1)" }
            }}
          >
            <EmailIcon />
          </IconButton>
          <IconButton 
            sx={{ 
              color: darkMode ? "#4267B2" : "#1877f2",
              "&:hover": { transform: "scale(1.1)" }
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton 
            sx={{ 
              color: darkMode ? "#e1306c" : "#c13584",
              "&:hover": { transform: "scale(1.1)" }
            }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton 
            sx={{ 
              color: darkMode ? "#4caf50" : "#00a152",
              "&:hover": { transform: "scale(1.1)" }
            }}
          >
            <PhoneIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};