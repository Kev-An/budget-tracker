import axios from 'axios';

const API_URL = 'http://localhost:5000';

const handleAxiosError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error('Error response:', error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('Error request:', error.request);
  } else {
    // Something else happened
    console.error('Error message:', error.message);
  }
  throw error; // Re-throw the error to handle it in the calling function
};

export const getBudgets = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/budgets`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return []; // Return an empty array in case of error
  }
};

export const addBudget = async (budget) => {
  try {
    const response = await axios.post(`${API_URL}/api/budgets`, budget);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return null; // Return null in case of error
  }
};

export const updateBudget = async (id, updatedBudget) => {
  try {
    const response = await axios.put(`${API_URL}/api/budgets/${id}`, updatedBudget);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return null; // Return null in case of error
  }
};

export const deleteBudget = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/budgets/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return null; // Return null in case of error
  }
};
