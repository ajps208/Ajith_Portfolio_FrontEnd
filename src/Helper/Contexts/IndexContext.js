import React from "react";
import { NavBarProvider } from "./NavbarContext";

// Combine all providers
export const IndexContest = ({ children }) => {
  return (
    <NavBarProvider>
     {children}
    </NavBarProvider>
  );
};
