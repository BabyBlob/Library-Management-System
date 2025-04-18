import axios from 'axios';

const Url = '${import.meta.env.Url}';

export const fetchAllBooks = async () => {
  try {
    const response = await axios.get(`${Url}/Book`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch books');
  }
};