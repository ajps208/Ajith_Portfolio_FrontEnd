import axiosInstance from "../Axios/Axios";

export const fetchAnswer = async (question) => {
    try {
        console.log(question,"question fetchAnswer");
        
      const response = await axiosInstance.post('/ask', { question });
      console.log(response.data.answer,"response fetchAnswer");
      
      return response.data.answer;
    } catch (error) {
      console.error('Error fetching answer:', error);
      throw error;
    }
  };

export const getQuestion = async () => {
    try {
      console.log("inside getQuestion");
      const response = await axiosInstance.get('/questions');
      console.log(response,"response getQuestion");
      
      return response.data;
    } catch (error) {
      console.error('Error fetching question:', error);
      throw error;
    }
  };