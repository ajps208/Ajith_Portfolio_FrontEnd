import { useMediaQuery } from "@mui/material";
import React, { createContext, useState } from "react";

// Create Context
export const NavbarContext = createContext();

// Create Provider Component
export const NavBarProvider = ({ children }) => {
    const isMobile = useMediaQuery("(max-width:600px)"); // Check if it's a small screen

  const [toggle, setToggle] = useState(isMobile ? false : true);

  return (
    <NavbarContext.Provider value={{ toggle, setToggle }}>
      {children}
    </NavbarContext.Provider>
  );
};
