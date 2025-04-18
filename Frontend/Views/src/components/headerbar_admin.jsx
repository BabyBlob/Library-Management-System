import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeaderbarAdmin = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const userMenuItems = [
    { path: '/user-accounts', label: 'User Accounts' },
    { label: 'Logout', action: handleLogout }
  ];

  return (
    <header className="w-full bg-gradient-to-r from-[#834D40] to-[#374151] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/assets/images/Booklogo.png"
              alt="Library Logo"
              className="h-16 md:h-20 cursor-pointer"
              onClick={() => navigate('/home-admin')}
            />
            <span className="ml-3 text-white text-xl md:text-2xl font-bold font-['Noto_Sans']">
              Library Management System
            </span>
          </div>
          <div className="ml-10 flex items-center space-x-8">
            <nav className="flex space-x-8">
              <Link
                to="/home-admin"
                className="text-white hover:bg-[#834D40] px-2 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/Book/AddBook"
                className="text-white hover:bg-[#834D40] px-3 py-2 rounded-md text-sm font-medium"
              >
                Book Management
              </Link>
              <Link
                to="/Book/ShowBook"
                className="text-white hover:bg-[#834D40] px-3 py-2 rounded-md text-sm font-medium"
              >
                Book Storage
              </Link>
              <Link
                to="/Book/Lending"
                className="text-white hover:bg-[#834D40] px-3 py-2 rounded-md text-sm font-medium"
              >
                Lending Management
              </Link>
              <Link
                to="/Book/Lending/Logs"
                className="text-white hover:bg-[#834D40] px-3 py-2 rounded-md text-sm font-medium"
              >
                Book Log
              </Link>
            </nav>
            <div className="ml-4 flex items-center relative">
              {currentUser && (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="text-white hover:bg-[#834D40] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Welcome, {currentUser.username}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      {userMenuItems.map((item) => (
                        item.path ? (
                          <Link
                            key={item.label}
                            to={item.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowUserMenu(false)}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            key={item.label}
                            onClick={item.action}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.label}
                          </button>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderbarAdmin;