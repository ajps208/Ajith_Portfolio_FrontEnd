import { Box } from "@mui/material";
import React from "react";

export const AnswerBox = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        overflowX: "auto", // Enables horizontal scrolling
        "&::-webkit-scrollbar": {
          display: "none", // Hides the scrollbar
        },
      }}
    >
      <Box
        sx={{
          bottom: 0, // Anchors the box to the bottom
          width: { xs: "100%", md: "100%" },
          borderRadius: "20px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* reply */}
        <Box
          sx={{
            bottom: 0, // Anchors the box to the bottom
            width: "auto", // Adjusts width according to content
            display: "flex",
            flexDirection: "column",
            padding: "10px 20px",
            alignSelf: "flex-end",
            maxWidth: "100%",
            borderRadius: "30px",
            boxShadow:
              "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)",
            transform: "translateY(-5px)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow:
                "0px 8px 12px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.15)",
            },
            lineHeight: "1.6", // Line gap
          }}
        >
          Lorem ipsum dolo
        </Box>
        <Box
          sx={{
            bottom: 0, // Anchors the box to the bottom
            width: { xs: "100%", md: "100%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 20px",
            textAlign: "justify",
            fontFamily: "'Roboto', sans-serif", // Custom font
            lineHeight: "1.8", // Line gap
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          necessitatibus vero ipsam in expedita consequuntur facere officia
          pariatur ut autem nihil nobis ab, sapiente, voluptate eos laudantium
          minima. Corporis, blanditiis. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Doloremque necessitatibus vero ipsam in expedita
          consequuntur facere officia pariatur ut autem nihil nobis ab,
          sapiente, voluptate eos laudantium minima. Corporis, blanditiis.
          {/* Add more content as needed */}
        </Box>
      </Box>
    </Box>
  );
};
