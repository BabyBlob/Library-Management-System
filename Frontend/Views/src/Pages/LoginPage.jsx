import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headerbar from '../components/headerbar_default.jsx';
import DesktopImage from '../assets/images/DefaultLoginScreen.jpg';
import { useSnackbar } from 'notistack';
import { loginUser, signupUser } from '../../../Controllers/LoginController.js';

const LoginPage = () => {
    const [currentOption, setCurrentOption] = useState('login');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (currentOption === 'signup') {
                await signupUser(formData.username, formData.password);
                enqueueSnackbar('Signup is Successful.', { variant: 'success' });
                setCurrentOption('login');
                setFormData({ username: '', password: '' });
            } else {
                const data = await loginUser(formData.username, formData.password);
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                navigate(data.user.role === 'Admin' ? '/home-admin' : '/home-community');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Headerbar />
            <div className="relative min-h-screen bg-cover bg-center bg-no-repeat font-sans"
                style={{
                    backgroundImage: `url(${DesktopImage})`,
                    overflow: 'hidden',
                    fontFamily: "'Noto Sans', sans-serif"
                }}>
                <section className="absolute inset-0 flex items-center justify-center">
                    <div className="flex shadow-2xl">
                        <div className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl">
                            <div className="flex justify-center mb-6 w-full">
                                <button
                                    type="button"
                                    className={`px-8 py-3 text-lg font-bold transition-all duration-200 ${currentOption === 'login'
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-gray-200 text-blue-600 hover:bg-gray-300'
                                        } border border-gray-700 rounded-s-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
                                    onClick={() => {
                                        setCurrentOption('login');
                                        setError("");
                                    }}
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    className={`px-8 py-3 text-lg font-bold transition-all duration-200 ${currentOption === 'signup'
                                            ? 'bg-green-500 text-white shadow-md'
                                            : 'bg-gray-200 text-green-500 hover:bg-gray-300'
                                        } border-t border-b border-r border-gray-700 rounded-e-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                                    onClick={() => {
                                        setCurrentOption('signup');
                                        setError("");
                                    }}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {error && <div className="text-red-500">{error}</div>}

                            <form onSubmit={handleSubmit} className="flex flex-col text-2xl text-left gap-1 w-full">
                                <span>Username</span>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="rounded-md p-2 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
                                    required
                                />
                                <span className="mt-4">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="rounded-md p-2 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
                                    required
                                />
                                {currentOption === 'login' && (
                                    <div className="flex gap-1 items-center">
                                        <input type="checkbox" />
                                        <span className="text-base">Remember Password</span>
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
                                >
                                    {loading ? 'Processing...' : currentOption === 'login' ? 'Login' : 'Sign Up'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default LoginPage;