import { create } from "zustand";

export const useDarkModeStore = create((set) => ({
  darkMode: true,
  setDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
