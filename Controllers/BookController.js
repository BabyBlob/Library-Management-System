import axios from 'axios';
import { useSnackbar } from 'notistack';

const Url = '${import.meta.env.Url}/';

export const addBook = async (bookData, enqueueSnackbar, navigate) => {
  try {
    const response = await axios.post(`${Url}/Book`, bookData);
    enqueueSnackbar('The Book has been created successfully.', { variant: 'success' });
    navigate('/');
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    enqueueSnackbar('Error Occurred', { variant: 'error' });
    throw error;
  }
};

export const updateBook = async (book_ID, bookData, enqueueSnackbar, navigate) => {
  if (!book_ID) {
    enqueueSnackbar('Please enter a Book ID to update', { variant: 'error' });
    return;
  }

  try {
    await axios.put(`${Url}/Book/${book_ID}`, bookData);
    enqueueSnackbar('The Book has been updated successfully.', { variant: 'success' });
    navigate('/');
  } catch (error) {
    console.error('Error updating book:', error);
    enqueueSnackbar('Error Occurred', { variant: 'error' });
    throw error;
  }
};

export const deleteBook = async (book_ID, enqueueSnackbar, navigate) => {
  if (!book_ID) {
    enqueueSnackbar('Please enter a Book ID to delete', { variant: 'error' });
    return;
  }

  try {
    await axios.delete(`${Url}/Book/${book_ID}`);
    enqueueSnackbar('The Book has been deleted successfully.', { variant: 'success' });
    navigate('/');
  } catch (error) {
    console.error('Error deleting book:', error);
    enqueueSnackbar('Error Occurred', { variant: 'error' });
    throw error;
  }
};

export const fetchBookDetails = async (book_ID, enqueueSnackbar) => {
  if (!book_ID) {
    enqueueSnackbar('Please enter a Book ID to fetch details', { variant: 'error' });
    return null;
  }

  try {
    const response = await axios.get(`${Url}/Book/${book_ID}`);
    enqueueSnackbar('Book details loaded successfully', { variant: 'success' });
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    enqueueSnackbar('Error fetching book details', { variant: 'error' });
    throw error;
  }
};