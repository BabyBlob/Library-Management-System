import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DesktopImage from '../assets/images/BackgroundImageLibraryBookSystem.jpg';
import Headerbar from '../components/headerbar_admin.jsx';
import { borrowBook, returnBook } from '../../../Controllers/BookLendController.js';

const BookLendManagement = () => {
  const [book_ID, setbook_ID] = useState('');
  const [borrower_name, setborrower_name] = useState('');
  const [borrower_phone, setborrower_phone] = useState('');
  const [returnee_name, setreturnee_name] = useState('');
  const [returnee_phone, setreturnee_phone] = useState('');
  const [date_borrowed, setdate_borrowed] = useState('');
  const [due_date, setdue_date] = useState('');
  const [date_returned, setdate_returned] = useState('');
  const [book_condition, setbook_condition] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentoption, setActiveTab] = useState('borrow');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleBorrowBook = async () => {
    setLoading(true);
    try {
      await borrowBook({
        book_ID,
        borrower_name,
        borrower_phone,
        date_borrowed,
        due_date,
        book_condition
      }, enqueueSnackbar, navigate);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async () => {
    setLoading(true);
    try {
      await returnBook({
        book_ID,
        returnee_name,
        returnee_phone,
        date_returned,
        book_condition
      }, enqueueSnackbar, navigate);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Headerbar />
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url(${DesktopImage})` }}>
        <div className='p-4'>
          <BackButton />
          {loading && <Spinner />}
          <div className='flex flex-col border-2 border-gray-300 rounded-lg w-[600px] p-6 mx-auto shadow-md bg-[#834D40]'>
            <div className='flex justify-center mb-6'>
              <button
                type="button"
                className={`px-8 py-3 text-lg font-bold transition-all duration-200 ${
                  currentoption === 'borrow'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-200 text-green-500 hover:bg-gray-300'
                } border border-gray-700 rounded-s-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                onClick={() => setActiveTab('borrow')}
              >
                Borrow Book
              </button>
              <button
                type="button"
                className={`px-8 py-3 text-lg font-bold transition-all duration-200 ${
                  currentoption === 'return'
                    ? 'bg-orange-300 text-white shadow-md'
                    : 'bg-gray-200 text-orange-300 hover:bg-gray-300'
                } border border-gray-700 rounded-e-lg focus:outline-none focus:ring-2 focus:ring-orange-300`}
                onClick={() => setActiveTab('return')}
              >
                Return Book
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-lg text-center font-medium mb-1 text-white'>Book ID</label>
                <input
                  type='text'
                  value={book_ID}
                  onChange={(e) => setbook_ID(e.target.value)}
                  className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                />
              </div>

              {currentoption === 'borrow' && (
                <>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Borrower Name</label>
                    <input
                      type='text'
                      value={borrower_name}
                      onChange={(e) => setborrower_name(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Borrower Phone</label>
                    <input
                      type='text'
                      value={borrower_phone}
                      onChange={(e) => setborrower_phone(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Date Borrowed</label>
                    <input
                      type='date'
                      value={date_borrowed}
                      onChange={(e) => setdate_borrowed(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Due Date</label>
                    <input
                      type='date'
                      value={due_date}
                      onChange={(e) => setdue_date(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div className='my-4'>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Book Condition</label>
                    <select
                      value={book_condition}
                      onChange={(e) => setbook_condition(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    >
                      <option value="">Select Condition</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                </>
              )}

              {currentoption === 'return' && (
                <>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Returnee Name</label>
                    <input
                      type='text'
                      value={returnee_name}
                      onChange={(e) => setreturnee_name(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Returnee Phone</label>
                    <input
                      type='text'
                      value={returnee_phone}
                      onChange={(e) => setreturnee_phone(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Date Returned</label>
                    <input
                      type='date'
                      value={date_returned}
                      onChange={(e) => setdate_returned(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div className='my-4'>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Book Condition</label>
                    <select
                      value={book_condition}
                      onChange={(e) => setbook_condition(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    >
                      <option value="">Select Condition</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className='flex justify-center mt-6'>
              {currentoption === 'borrow' ? (
                <button
                  className='w-[350px] rounded-full px-6 py-3 bg-[#2A4047] text-white hover:bg-blue-700 transition text-lg'
                  onClick={handleBorrowBook}
                >
                  Borrow Book
                </button>
              ) : (
                <button
                  className='w-[350px] rounded-full px-6 py-3 bg-yellow-600 text-white hover:bg-yellow-700 transition text-lg'
                  onClick={handleReturnBook}
                >
                  Return Book
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookLendManagement;