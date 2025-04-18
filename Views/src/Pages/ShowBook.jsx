import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Headerbar from '../components/headerbar_admin.jsx';
import { fetchAllBooks } from '../../../Controllers/BookStorageController.js';

const ShowBook = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchAllBooks();
        setBooks(booksData);
        setFilteredBooks(booksData);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book => 
        Object.values(book).some(
          value => value && 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="p-4">
        <Headerbar />
        <div className="bg-red-100 text-red-700 p-4 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Headerbar />
      <div className="p-4">
        <h1 className="text-3xl my-4">Book Inventory</h1>
        
        <div className="my-4">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Author</th>
                <th scope="col" className="px-6 py-3">Publisher</th>
                <th scope="col" className="px-6 py-3">ISBN</th>
                <th scope="col" className="px-6 py-3">Condition</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.book_ID} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{book.book_ID}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {book.book_name}
                    </td>
                    <td className="px-6 py-4">{book.book_author}</td>
                    <td className="px-6 py-4">{book.book_publisher}</td>
                    <td className="px-6 py-4">{book.book_ISBN}</td>
                    <td className="px-6 py-4">{book.book_condition}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    {searchTerm
                      ? `No books found matching "${searchTerm}"`
                      : 'No books found in the database'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShowBook;