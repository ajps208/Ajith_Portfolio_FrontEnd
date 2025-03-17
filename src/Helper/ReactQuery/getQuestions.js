import { useQuery } from "@tanstack/react-query";
import { getQuestion } from "../Methods/ApiCall";
import { useQuestionStore } from "../Store/QuestionStore";

export const useFetchQuestions = () => {
  const { setQuestion } = useQuestionStore();

  return useQuery({
    queryKey: ["apiData"],
    queryFn: getQuestion,

  });
};
