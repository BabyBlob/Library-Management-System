import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DesktopImage from '../assets/images/BackgroundImageLibraryBookSystem.jpg';
import Headerbar from '../components/headerbar_admin.jsx';
import { addBook, updateBook, deleteBook, fetchBookDetails } from '../../../Controllers/BookController.js';

const AddBook = () => {
  const [book_ID, setbook_ID] = useState('');
  const [book_name, setbook_name] = useState('');
  const [book_publisher, setbook_publisher] = useState('');
  const [book_author, setbook_author] = useState('');
  const [book_ISBN, setbook_ISBN] = useState('');
  const [book_condition, setbook_condition] = useState('');
  const [book_Genre, setbook_Genre] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentoption, setActiveTab] = useState('add');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleAddBook = async () => {
    setLoading(true);
    try {
      await addBook({
        book_ID,
        book_name,
        book_publisher,
        book_author,
        book_ISBN,
        book_condition,
        book_Genre,
      }, enqueueSnackbar, navigate);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBook = async () => {
    setLoading(true);
    try {
      await updateBook(book_ID, {
        book_name,
        book_publisher,
        book_author,
        book_ISBN,
        book_condition,
        book_Genre,
      }, enqueueSnackbar, navigate);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async () => {
    setLoading(true);
    try {
      await deleteBook(book_ID, enqueueSnackbar, navigate);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleFetchBookDetails = async () => {
    setLoading(true);
    try {
      const bookData = await fetchBookDetails(book_ID, enqueueSnackbar);
      if (bookData) {
        setbook_name(bookData.book_name || '');
        setbook_publisher(bookData.book_publisher || '');
        setbook_author(bookData.book_author || '');
        setbook_ISBN(bookData.book_ISBN || '');
        setbook_condition(bookData.book_condition || '');
        setbook_Genre(bookData.book_Genre || '');
      }
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
                  currentoption === 'add'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-200 text-green-500 hover:bg-gray-300'
                } border border-gray-700 rounded-s-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                onClick={() => setActiveTab('add')}
              >
                Book Entry
              </button>
              <button
                type="button"
                className={`px-8 py-3 text-lg font-bold transition-all duration-200 ${
                  currentoption === 'update'
                    ? 'bg-orange-300 text-white shadow-md'
                    : 'bg-gray-200 text-orange-300 hover:bg-gray-300'
                } border-t border-b border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300`}
                onClick={() => setActiveTab('update')}
              >
                Book Update
              </button>
              <button
                type="button"
                className={`px-8 py-3 text-lg font-bold transition-all duration-200 ${
                  currentoption === 'delete'
                    ? 'bg-red-400 text-white shadow-md'
                    : 'bg-gray-200 text-red-400 hover:bg-gray-300'
                } border border-gray-700 rounded-e-lg focus:outline-none focus:ring-2 focus:ring-red-400`}
                onClick={() => setActiveTab('delete')}
              >
                Book Delete
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
                {currentoption === 'update' && (
                  <button
                    onClick={handleFetchBookDetails}
                    className='mt-2 w-full rounded-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition text-lg'
                  >
                    Fetch Book Details
                  </button>
                )}
              </div>

              {(currentoption === 'add' || currentoption === 'update') && (
                <>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Book Name</label>
                    <input
                      type='text'
                      value={book_name}
                      onChange={(e) => setbook_name(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Book Publisher</label>
                    <input
                      type='text'
                      value={book_publisher}
                      onChange={(e) => setbook_publisher(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Book Author</label>
                    <input
                      type='text'
                      value={book_author}
                      onChange={(e) => setbook_author(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Book ISBN</label>
                    <input
                      type='text'
                      value={book_ISBN}
                      onChange={(e) => setbook_ISBN(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Book Condition</label>
                    <input
                      type='text'
                      value={book_condition}
                      onChange={(e) => setbook_condition(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    />
                  </div>
                  <div className='my-4'>
                    <label className='block text-lg text-center font-medium mb-1 text-white'>Book Genre</label>
                    <select
                      value={book_Genre}
                      onChange={(e) => setbook_Genre(e.target.value)}
                      className='border-2 border-gray-300 px-4 py-2 w-full rounded'
                    >
                      <option value="">Select Genre</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-Fiction">Non-Fiction</option>
                      <option value="Science Fiction">Science Fiction</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Biography">Biography</option>
                      <option value="History">History</option>
                      <option value="Self-Help">Self-Help</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className='flex justify-center mt-6'>
              {currentoption === 'add' ? (
                <button
                  className='w-[350px] rounded-full px-6 py-3 bg-[#2A4047] text-white hover:bg-blue-700 transition text-lg'
                  onClick={handleAddBook}
                >
                  Add Book
                </button>
              ) : currentoption === 'update' ? (
                <button
                  className='w-[350px] rounded-full px-6 py-3 bg-yellow-600 text-white hover:bg-yellow-700 transition text-lg'
                  onClick={handleUpdateBook}
                >
                  Update Book
                </button>
              ) : (
                <button
                  className='w-[350px] rounded-full px-6 py-3 bg-red-600 text-white hover:bg-red-700 transition text-lg'
                  onClick={handleDeleteBook}
                >
                  Delete Book
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBook;