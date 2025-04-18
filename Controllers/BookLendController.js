import axios from 'axios';

const Url = '${import.meta.env.Url}/';

export const borrowBook = async (borrowData, enqueueSnackbar, navigate) => {
  if (!borrowData.book_ID || !borrowData.borrower_name || !borrowData.borrower_phone || 
      !borrowData.date_borrowed || !borrowData.due_date || !borrowData.book_condition) {
    enqueueSnackbar('All fields are required to borrow a book', { variant: 'error' });
    throw new Error('Missing required fields');
  }

  try {
    await axios.post(`${Url}/Book/Lending/borrow`, borrowData);
    enqueueSnackbar('Book borrowed successfully', { variant: 'success' });
    navigate('/');
  } catch (error) {
    enqueueSnackbar(error.response?.data?.message || 'Error borrowing book', { variant: 'error' });
    throw error;
  }
};

export const returnBook = async (returnData, enqueueSnackbar, navigate) => {
  if (!returnData.book_ID || !returnData.returnee_name || !returnData.returnee_phone || 
    !returnData.date_returned || !returnData.book_condition) {
    enqueueSnackbar('All fields are required to return a book', { variant: 'error' });
    throw new Error('Missing required fields');
  }

  try {
    await axios.post(`${Url}/Book/Lending/return`, returnData);
    enqueueSnackbar('Book returned successfully', { variant: 'success' });
    navigate('/');
  } catch (error) {
    enqueueSnackbar(error.response?.data?.message || 'Error returning book', { variant: 'error' });
    throw error;
  }
};