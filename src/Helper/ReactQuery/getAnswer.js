import { useMutation } from "@tanstack/react-query";
import { fetchAnswer } from "../Methods/ApiCall";
import { useAnswerStore } from "../Store/AnswerStore";

export const useGetAnswer = () => { 
  const { messages, addMessage, updateMessage } = useAnswerStore();

  return useMutation({
    mutationFn: (question) => fetchAnswer(question),
    onMutate: (question) => {
      addMessage({ question, answer: "Loading...", loading: true });
      return messages.length;
    },
    onSuccess: (response, question, index) => {
      updateMessage(index, { answer: response, loading: false });
    },
    onError: (error, question, index) => {
      updateMessage(index, { answer: "Failed to load response.", loading: false });
    },
  });
};
