import {create} from "zustand";

export const useQuestionStore = create((set) => ({
    question: "",
    setQuestion: (question) => set(() => ({ question })),
}));