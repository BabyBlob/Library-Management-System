import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fetchBookDetails, updateBook, addBook } from '../../../Controllers/BookController.js';

const UpdateBook = () => {
  const { book_ID } = useParams();
  const [book_name, setbook_name] = useState('');
  const [book_publisher, setbook_publisher] = useState('');
  const [book_author, setbook_author] = useState('');
  const [book_ISBN, setbook_ISBN] = useState('');
  const [book_condition, setbook_condition] = useState('');
  const [book_Genre, setbook_Genre] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookData = async () => {
      if (book_ID) {
        setLoading(true);
        try {
          const bookData = await fetchBookDetails(book_ID, enqueueSnackbar);
          if (bookData) {
            setbook_name(bookData.book_name);
            setbook_publisher(bookData.book_publisher);
            setbook_author(bookData.book_author);
            setbook_ISBN(bookData.book_ISBN);
            setbook_condition(bookData.book_condition);
            setbook_Genre(bookData.book_Genre);
          }
        } catch (error) {
          
        } finally {
          setLoading(false);
        }
      }
    };
  
    loadBookData();
  }, [book_ID]);

  const handleUpdateBook = async () => {
    const data = {
      book_name,
      book_publisher,
      book_author,
      book_ISBN,
      book_condition,
      book_Genre,
    };

    if (book_ID) {
      await updateBook(book_ID, data, enqueueSnackbar, navigate, setLoading);
    } else {
      await addBook(data, enqueueSnackbar, navigate, setLoading);
    }
  };

  return (
    <div className='p-4'>
      <BackButton></BackButton>
      <h1 className='text-3xl my-4'>{book_ID ? 'Edit Book' : 'Add Book'}</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-400'>Book ID</label>
          <input
            type='text'
            value={book_ID || ''}
            className='border-2 border-gray-400 px-4 py-2 w-full'
            disabled={!!book_ID}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-400'>Book Name</label>
          <input
            type='text'
            value={book_name}
            onChange={(e) => setbook_name(e.target.value)}
            className='border-2 border-gray-400 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-400'>Publisher</label>
          <input
            type='text'
            value={book_publisher}
            onChange={(e) => setbook_publisher(e.target.value)}
            className='border-2 border-gray-400 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-400'>Author</label>
          <input
            type='text'
            value={book_author}
            onChange={(e) => setbook_author(e.target.value)}
            className='border-2 border-gray-400 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-400'>ISBN</label>
          <input
            type='text'
            value={book_ISBN}
            onChange={(e) => setbook_ISBN(e.target.value)}
            className='border-2 border-gray-400 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-400'>Condition</label>
          <input
            type='text'
            value={book_condition}
            onChange={(e) => setbook_condition(e.target.value)}
            className='border-2 border-gray-400 px-4 py-2 w-full'
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

        <button className='p-2 bg-sky-300 m-8' onClick={handleUpdateBook}>
          {book_ID ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;