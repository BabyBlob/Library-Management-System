import axios from 'axios';

const Url = '${import.meta.env.Url}//users';  

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${Url}/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(
      error.response?.data?.error || 
      error.response?.data?.message || 
      'Login failed. Please try again.'
    );
  }
};

export const signupUser = async (username, password) => {
  try {
    const response = await axios.post(`${Url}/signup`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(
      error.response?.data?.error || 
      error.response?.data?.message || 
      'Signup failed. Please try again.'
    );
  }
};

export const fetchUsers = async () => {
  try {
      const response = await axios.get(Url); 
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch users');
  }
};

export const deleteUser = async (userId) => {
  try {
      const response = await axios.delete(`${Url}/${userId}`);
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete user');
  }
};