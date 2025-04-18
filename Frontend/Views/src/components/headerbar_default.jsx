import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderbarDefault = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <header className="w-full h-[130px] px-[90px] flex items-center justify-between bg-gradient-to-r from-[#834D40] to-[#374151]">
      <div className="flex items-center flex-shrink-0">
        <img
          src="/assets/images/Booklogo.png"
          alt="Library Logo"
          className="h-[230px] pr-[20px] cursor-pointer"
          onClick={() => navigate('/')}
        />
        <span className="font-['Noto_Sans'] text-[32px] text-white font-bold">
          Library Management and Community System
        </span>
      </div>

      <div className="flex items-center">
        {user && (
          <div className="flex items-center">
            <span className="font-['Noto_Sans'] text-[18px] text-white mr-[20px]">
              Welcome, {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="font-['Noto_Sans'] text-[18px] text-white px-[20px] py-[10px] rounded-[20px] hover:bg-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderbarDefault;