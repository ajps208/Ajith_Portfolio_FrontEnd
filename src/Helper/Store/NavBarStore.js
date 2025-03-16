import { create } from "zustand";
import { useMediaQuery } from "@mui/material";

const useNavbarStore = create((set) => {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;

  return {
    toggle: isMobile ? false : true, 
    setToggle: (value) => set({ toggle: value }),
  };
});

export default useNavbarStore;
