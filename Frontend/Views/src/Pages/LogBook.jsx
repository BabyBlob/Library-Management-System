import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';
import Headerbar from '../components/headerbar_admin.jsx';
import { fetchLogs } from '../../../Controllers/BookLogController.js';

const LogBook = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Search, SetSearch] = useState('');
    const [error, setError] = useState(null);
    const { book_ID } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetchLogs(book_ID)
            .then((logsData) => {
                setLogs(logsData);
                setFilteredLogs(logsData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching logs:', error);
                setLoading(false);
                setError(error.message || 'Error fetching logs');
                enqueueSnackbar(error.message || 'Error fetching logs', { variant: 'error' });
                navigate('/');
            });
    }, [book_ID, enqueueSnackbar, navigate]);

    useEffect(() => {
        if (Search.trim() === '') {
            setFilteredLogs(logs);
        } else {
            const filtered = logs.filter(log => 
                log.book_ID.toString().toLowerCase().includes(Search.toLowerCase())
            );
            setFilteredLogs(filtered);
        }
    }, [Search, logs]);

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

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Headerbar />
            <div className="p-4">
                <h1 className="text-3xl my-4">
                    {book_ID ? `Lending Logs for Book ID: ${book_ID}` : 'Book Lending Log'}
                </h1>

                <div className="my-4">
                    <input
                        type="text"
                        placeholder="Search Book ID"
                        value={Search}
                        onChange={(e) => SetSearch(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!!book_ID}
                    />
                    {book_ID && (
                        <p className="text-sm text-gray-500 mt-1">
                            Search disabled when viewing specific book logs
                        </p>
                    )}
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Book ID</th>
                                <th scope="col" className="px-6 py-3">Borrowed</th>
                                <th scope="col" className="px-6 py-3">Returned</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.length > 0 ? (
                                filteredLogs.map((log, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{log.book_ID}</td>
                                        <td className="px-6 py-4">{formatDate(log.date_borrowed)}</td>
                                        <td className="px-6 py-4">{formatDate(log.date_returned)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`${log.date_returned ? 'text-green-600' : 'text-red-600'}`}>
                                                {log.date_returned ? 'Returned' : 'Borrowed'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{formatDate(log.updatedAt)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">
                                        {Search
                                            ? `No lending logs found matching "${Search}"`
                                            : `No lending logs found${book_ID ? ' for this book' : ''}`}
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

export default LogBook;