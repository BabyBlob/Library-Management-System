import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';
import Headerbar from '../components/headerbar_admin.jsx';
import { fetchUsers, deleteUser } from '../../../Controllers/LoginController.js';

const UserAccounts = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        fetchUsers()
            .then((usersData) => {
                setUsers(usersData);
                setFilteredUsers(usersData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setLoading(false);
                setError(error.message || 'Error fetching users');
                enqueueSnackbar(error.message || 'Error fetching users', { variant: 'error' });
            });
    }, [enqueueSnackbar]);

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user =>
                user.username.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [search, users]);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                setLoading(true);
                await deleteUser(userId);
                setUsers(users.filter(user => user._id !== userId));
                setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
                enqueueSnackbar('User has been deleted successfully', { variant: 'success' });
                setLoading(false);
            } catch (error) {
                console.error('There was an Error Deleting User data:', error);
                enqueueSnackbar(error.message || 'There was an Error Deleting User data.', { variant: 'error' });
                setLoading(false);
            }
        }
    };

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
                <h1 className="text-3xl my-4">User Accounts</h1>

                <div className="my-4">
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Username</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{user.username}</td>
                                        <td className="px-6 py-4">{user.role || 'user'}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="text-red-600 hover:text-red-900 font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center">
                                        {search
                                            ? `No users found matching "${search}"`
                                            : 'No users found'}
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

export default UserAccounts;