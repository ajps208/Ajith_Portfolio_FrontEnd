import { create } from "zustand";

export const useDarkModeStore = create((set) => ({
  darkMode: false,
  setDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
