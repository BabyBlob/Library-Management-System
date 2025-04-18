import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { deleteBook } from '../../../Controllers/BookController';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { book_ID } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    
    const handleDeleteBook = () => {
        deleteBook(book_ID, enqueueSnackbar, navigate, setLoading);
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
                
                <button
                    className='p-4 bg-red-600 text-white m-8 w-full'
                    onClick={handleDeleteBook}
                >
                    Yes, Delete it
                </button>
            </div>
        </div>
    );
};

export default DeleteBook;