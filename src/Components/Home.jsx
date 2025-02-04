import React, { useContext } from "react";
import { Sidebbar } from "./Sidebbar";
import { Mainbar } from "./Mainbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import { Button, useMediaQuery } from "@mui/material";
import { NavbarContext } from "../Helper/Contexts/NavbarContext";

export const Home = () => {
  const { toggle,setToggle } = useContext(NavbarContext);
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
          open={toggle} // Drawer opens/close based on 'toggle' state
          variant="temporary"
          sx={{"& .MuiDrawer-paper": {width: 240}}}
        >
                <Button onClick={()=>setToggle(!toggle)}> Expand</Button>

          <Sidebbar />
        </Drawer>
      )}
    </Box>
  );
};
