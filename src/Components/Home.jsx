import React from "react";
import { Sidebbar } from "./Sidebbar";
import { Mainbar } from "./Mainbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import { Button, useMediaQuery } from "@mui/material";
import WindowIcon from "@mui/icons-material/Window";
import useNavbarStore from "../Helper/Store/NavBarStore";

export const Home = () => {
  const { toggle, setToggle } = useNavbarStore();
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if it's a small screen

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Sidebar on larger screens */}
        {!isMobile && toggle && (
          <Grid item xs={6} md={2}>
            <Sidebbar />
          </Grid>
        )}

        {/* Mainbar taking full width on mobile and adjusted width on larger screens */}
        <Grid item xs={12} md={toggle ? 10 : 12}>
          <Mainbar />
        </Grid>
      </Grid>

      {/* Sidebar as Drawer on small screens */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={toggle} 
          onClose={() => setToggle(!toggle)}
          variant="temporary"
          sx={{
            "& .MuiDrawer-paper": { width: 240 },
            borderRight: "2px solid black",
          }}
        >
          {/* <Button onClick={() => setToggle(!toggle)}>
            {" "}
            <WindowIcon />
          </Button> */}

          <Sidebbar />
        </Drawer>
      )}
    </Box>
  );
};
