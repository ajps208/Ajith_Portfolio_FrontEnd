import { create } from "zustand";

export const useAnswerStore = create((set) => ({
  messages: [],
  history: [],

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  updateMessage: (index, newData) =>
    set((state) => {
      const updatedMessages = [...state.messages];
      updatedMessages[index] = { ...updatedMessages[index], ...newData };
      return { messages: updatedMessages };
    }),

  clearMessages: () =>
    set((state) => {
      if (state.messages.length > 0) {
        const lastQuestion = state.messages[state.messages.length - 1].question || "No Question";
        const timestamp = new Date().toLocaleString();

        return {
          history: [...state.history, { id: timestamp, name: lastQuestion, messages: state.messages }],
          messages: [],
        };
      }
      return { messages: [] };
    }),

  loadHistory: (id) =>
    set((state) => {
      const selectedHistory = state.history.find((h) => h.id === id);
      return { messages: selectedHistory ? selectedHistory.messages : [] };
    }),

  deleteHistory: (id) =>
    set((state) => ({
      history: state.history.filter((h) => h.id !== id),
    })),
}));
